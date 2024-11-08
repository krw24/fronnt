import { useState, useEffect, useRef } from "react";

export default function useChatLogic(userLoged, chatIsOpen) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatId, setChatId] = useState(null);
  const [agenteAsignado, setAgenteAsignado] = useState(null);
  const [esperandoAgente, setEsperandoAgente] = useState(false);
  const [mensajesNoLeidos, setMensajesNoLeidos] = useState(0);
  const messagesEndRef = useRef(null);
  const intervalRef = useRef(null);
  const lastMessageCount = useRef(0);

  // Reducimos el intervalo a 1 segundo para actualizaciones más rápidas
  const INTERVALO_ACTUALIZACION = 2000;
  const API_URL = "http://localhost:3001";

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Verificar si hay un chat existente al cargar la página
    const verificarChatExistente = async () => {
      if (!userLoged?.id) return;

      try {
        const response = await fetch(
          `${API_URL}/chat/user/${userLoged.id}/active`
        );
        const data = await response.json();

        if (data && data.id) {
          setChatId(data.id);
          await verificarAgenteAsignado(data.id);
          await actualizarMensajes(data.id);
        } else {
          await iniciarChat();
        }
        setIsFirstLoad(false);
      } catch (error) {
        console.error("Error al verificar chat existente:", error);
        setIsFirstLoad(false);
      }
    };

    if (isFirstLoad && userLoged?.id) {
      verificarChatExistente();
    }
  }, [userLoged, isFirstLoad]);

  // Resetear mensajes no leídos cuando se abre el chat
  useEffect(() => {
    if (chatIsOpen) {
      setMensajesNoLeidos(0);
      lastMessageCount.current = messages.length;
    }
  }, [chatIsOpen]);

  // Iniciar chat cuando hay usuario logueado
  useEffect(() => {
    if (userLoged?.id && !chatId) {
      iniciarChat();
    }
  }, [userLoged]);

  const iniciarChat = async () => {
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userLoged.id }),
      });

      const data = await response.json();
      console.log("data", data);
      const newChatId = data.id;
      setChatId(newChatId);
      await verificarAgenteAsignado(newChatId);
      await actualizarMensajes(newChatId);
    } catch (error) {
      console.error("Error al iniciar chat:", error);
    }
  };

  const verificarAgenteAsignado = async (chatId) => {
    try {
      const response = await fetch(`${API_URL}/chat/${chatId}`);
      const data = await response.json();
      console.log("data", data);
      if (data.support_name) {
        setAgenteAsignado({ nombre: data.support_name });
        setEsperandoAgente(false);
      } else {
        setEsperandoAgente(true);
        setTimeout(
          () => verificarAgenteAsignado(chatId),
          INTERVALO_ACTUALIZACION
        );
      }
    } catch (error) {
      console.error("Error al verificar agente:", error);
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio("/notificacion.mp3");
    audio.volume = 1; 
    audio.play().catch((error) => {
      console.error("Error al reproducir sonido:", error);
    });
  };

  const actualizarMensajes = async (specificChatId = null) => {
    const currentChatId = specificChatId || chatId;
    if (!currentChatId) return;

    try {
      const response = await fetch(`${API_URL}/chat/${currentChatId}/messages`);
      const nuevosMensajes = await response.json();

      // Actualizar lastMessageCount en la primera carga
      if (isFirstLoad) {
        lastMessageCount.current = nuevosMensajes.length;
      }

      if (JSON.stringify(nuevosMensajes) !== JSON.stringify(messages)) {
        setMessages(nuevosMensajes);

        // Reproducir sonido y actualizar mensajes no leídos solo si:
        // 1. El chat está minimizado
        // 2. No es la primera carga
        // 3. Hay mensajes nuevos
        // 4. El último mensaje no es del usuario actual
        if (
          !chatIsOpen &&
          !isFirstLoad &&
          nuevosMensajes.length > lastMessageCount.current &&
          nuevosMensajes[nuevosMensajes.length - 1]?.sender_id !== userLoged.id
        ) {
          const nuevosNoLeidos =
            nuevosMensajes.length - lastMessageCount.current;
          setMensajesNoLeidos((prev) => prev + nuevosNoLeidos);
          playNotificationSound(); // Reproducir el sonido
        }

        lastMessageCount.current = nuevosMensajes.length;
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error al actualizar mensajes:", error);
    }
  };

  // Agregar un intervalo para actualizar mensajes periódicamente
  useEffect(() => {
    if (chatId) {
      const interval = setInterval(() => {
        actualizarMensajes();
      }, INTERVALO_ACTUALIZACION);

      return () => clearInterval(interval);
    }
  }, [chatId, chatIsOpen]);
  const enviarMensaje = async () => {
    if (!inputMessage.trim() || !chatId) return;

    try {
      await fetch(`${API_URL}/chat/${chatId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_id: userLoged.id,
          message: inputMessage.trim(),
        }),
      });

      setInputMessage("");
      // Actualización inmediata después de enviar
      await actualizarMensajes();
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return {
    messages,
    inputMessage,
    setInputMessage,
    enviarMensaje,
    messagesEndRef,
    agenteAsignado,
    esperandoAgente,
    mensajesNoLeidos,
    isLoading: isFirstLoad,
  };
}

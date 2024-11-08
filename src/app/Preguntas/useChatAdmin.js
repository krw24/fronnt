import { useState, useEffect, useCallback } from "react";

export const useChatAdmin = (role, userLoged) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const API_BASE = "http://localhost:3001";

  // Función para manejar errores de fetch
  const handleFetchError = async (response) => {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    return response.json();
  };

  // Obtener todos los chats según el rol con retry
  const fetchChats = async (retryCount = 3) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/chats`);

      const data = await handleFetchError(response);

      setChats(
        data
          .map((chat) => ({
            ...chat,
            lastMessageTime: new Date(
              chat.last_message_time || chat.created_at
            ).getTime(),
          }))
          .sort((a, b) => b.lastMessageTime - a.lastMessageTime)
      );

      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      console.error("Error fetching chats:", err);
      if (retryCount > 0) {
        setTimeout(() => fetchChats(retryCount - 1), 1000);
      } else {
        setError("Error al cargar los chats. Por favor, intente nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Obtener mensajes con retry y manejo de errores mejorado
  const fetchMessages = useCallback(async (chatId, retryCount = 3) => {
    if (!chatId) return;

    try {
      const response = await fetch(`${API_BASE}/chat/${chatId}/messages`);
      const data = await handleFetchError(response);
      setMessages(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching messages:", err);
      if (retryCount > 0) {
        setTimeout(() => fetchMessages(chatId, retryCount - 1), 1000);
      } else {
        setError(
          "Error al cargar los mensajes. Por favor, intente nuevamente."
        );
      }
    }
  }, []);

  // Asignar chat con validación mejorada
  // ... resto del código ...

  const assignChat = async (chatId) => {
    if (!userLoged?.id) {
      setError("No hay usuario logueado para asignar el chat");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/chat/${chatId}/assign`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          support_id: userLoged.id, // Aquí estaba el error, estaba hardcodeado a 1
          support_name: userLoged.name,
        }),
      });

      const data = await handleFetchError(response);

      if (data.success) {
        setSelectedChat((prev) => ({
          ...prev,
          support_id: userLoged.id,
          support_name: userLoged.name,
        }));
        await fetchChats(); // Actualizar la lista de chats
      } else {
        setError(data.message || "Error al asignar el chat");
      }
    } catch (err) {
      setError("Error al asignar el chat. Por favor, intente nuevamente.");
      console.error(err);
    }
  };

  // Modificar handleSelectChat para manejar mejor la asignación
  const handleSelectChat = async (chat) => {
    setSelectedChat(chat);
    await fetchMessages(chat.id);

    if (role === "support" && !chat.support_id) {
      console.log("Intentando asignar chat:", chat.id, "a usuario:", userLoged);
      await assignChat(chat.id);
    }
    await markChatAsRead(chat.id);
  };

  // Enviar mensaje con retry
  const sendMessage = async (chatId, message, retryCount = 3) => {
    if (!message.trim()) return;

    try {
      const response = await fetch(`${API_BASE}/chat/${chatId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_id: userLoged.id,
          message: message.trim(),
          sender_name: userLoged.name,
        }),
      });

      await handleFetchError(response);
      await fetchMessages(chatId);
      setError(null);
    } catch (err) {
      console.error("Error sending message:", err);
      if (retryCount > 0) {
        setTimeout(() => sendMessage(chatId, message, retryCount - 1), 1000);
      } else {
        setError("Error al enviar el mensaje. Por favor, intente nuevamente.");
      }
    }
  };

  // Nuevas funciones agregadas
  const markChatAsRead = async (chatId) => {
    try {
      await fetch(`${API_BASE}/chat/${chatId}/read`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ support_id: userLoged.id }),
      });
    } catch (err) {
      console.error("Error marking chat as read:", err);
    }
  };

  const transferChat = async (chatId, newSupportId) => {
    try {
      const response = await fetch(`${API_BASE}/chat/${chatId}/transfer`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_support_id: newSupportId }),
      });

      await handleFetchError(response);
      setSelectedChat(null);
      await fetchChats();
    } catch (err) {
      setError("Error al transferir el chat");
      console.error(err);
    }
  };

  // Efectos mejorados
  useEffect(() => {
    fetchChats();
    const interval = setInterval(fetchChats, 5000); // Actualizar cada 5 segundos
    return () => clearInterval(interval);
  }, [role, userLoged?.id]);

  useEffect(() => {
    if (selectedChat?.id) {
      const interval = setInterval(() => {
        fetchMessages(selectedChat.id);
      }, 2000); // Actualizar cada 2 segundos
      return () => clearInterval(interval);
    }
  }, [selectedChat?.id, fetchMessages]);

  return {
    chats,
    selectedChat,
    messages,
    loading,
    error,
    lastUpdate,
    handleSelectChat,
    sendMessage,
    closeChat: async (chatId) => {
      try {
        const response = await fetch(`${API_BASE}/chat/close/${chatId}`, {
          method: "PATCH",
        });
        await handleFetchError(response);
        setSelectedChat(null);
        await fetchChats();
      } catch (err) {
        setError("Error al cerrar el chat");
        console.error(err);
      }
    },
    transferChat,
    markChatAsRead,
    refreshChats: fetchChats,
  };
};

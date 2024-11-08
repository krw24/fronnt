import { useState, useEffect, useCallback } from "react";
import { toast } from 'react-hot-toast';

export const useChatAdmin = (role, userLoged) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date().toISOString());

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3001";

  // Función para manejar errores de fetch
  const handleFetchError = async (response) => {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    return response.json();
  };

  // Función optimizada para obtener chats
  const fetchChats = useCallback(async () => {
    try {
      // Endpoint según el rol del usuario
      const endpoint = `${API_BASE}/chats`;

      const response = await fetch(endpoint);
      const data = await handleFetchError(response);

      if (data) {
        setChats(prevChats => {
          const updatedChats = Array.isArray(data) ? data : [];

          // Procesar cada chat para agregar lastMessageTime
          const processedChats = updatedChats.map(chat => ({
            ...chat,
            lastMessageTime: new Date(chat.last_message_at || chat.created_at).getTime()
          }));

          // Ordenar por último mensaje
          return processedChats.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
        });

        setError(null);
      }
    } catch (err) {
      console.error('Error fetching chats:', err);
      setError('Error al cargar los chats');
    }
  }, [API_BASE, role, userLoged.id]);

  // Efecto para actualización periódica modificado
  useEffect(() => {
    let interval;

    if (!loading) {
      // Actualización inicial
      fetchChats();

      // Configurar intervalo de actualización
      interval = setInterval(() => {
        fetchChats();
      }, 10000); // Actualizar cada 10 segundos
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [loading, fetchChats]);;



  const sendMessage = async (chatId, message) => {
    if (!message.trim() || !chatId || !userLoged?.id) {
      toast.error('No se puede enviar el mensaje: faltan datos necesarios');
      return;
    }
  
    // console.log('Enviando mensaje con:', {
    //   chatId,
    //   sender_id: userLoged.id,
    //   message: message.trim()
    // });
  
    try {
      const response = await fetch(`${API_BASE}/chat/${chatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender_id: userLoged.id,
          message: message.trim(),
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar el mensaje');
      }
  
      // Actualizar mensajes localmente
      const newMessage = {
        id: data.insertId,
        chat_id: chatId,
        message: message.trim(),
        sender_id: userLoged.id,
        created_at: new Date().toISOString(),
      };
  
      setMessages(prev => [...prev, newMessage]);
  
      // Actualizar el último mensaje en la lista de chats
      setChats(prevChats => 
        prevChats.map(chat => {
          if (chat.id === chatId) {
            return {
              ...chat,
              last_message: message.trim(),
              last_message_at: new Date().toISOString(),
            };
          }
          return chat;
        })
      );
  
      return true;
  
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      toast.error('Error al enviar el mensaje: ' + error.message);
      throw error;
    }
  };
  // Función para obtener mensajes actualizada
  const fetchMessages = async (chatId) => {
    if (!chatId) return;

    try {
      const response = await fetch(`${API_BASE}/chat/${chatId}/messages`);

      if (!response.ok) {
        throw new Error('Error al cargar los mensajes');
      }

      const data = await response.json();
      setMessages(data || []);
    } catch (error) {
      console.error('Error al cargar mensajes:', error);
      toast.error('Error al cargar los mensajes');
    }
  };

  // Función para transferir chat
  const transferChat = async (chatId, newAgentId) => {
    try {
      const response = await fetch(`${API_BASE}/chat/${chatId}/transfer`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_support_id: newAgentId,
        }),
      });

      const data = await handleFetchError(response);
      if (data.success) {
        await fetchChats();
        setSelectedChat(null);
        toast.success('Chat transferido exitosamente');
        return true;
      }
      throw new Error(data.message || 'Error al transferir el chat');
    } catch (error) {
      console.error('Error en transferChat:', error);
      toast.error('Error al transferir el chat');
      throw error;
    }
  };

  // Función para convertir a ticket
  const convertToTicket = async (chatId) => {
    try {
      const response = await fetch(`${API_BASE}/chat/${chatId}/convert-ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          user_id: userLoged.id,
        }),
      });

      const data = await handleFetchError(response);
      if (data.success) {
        toast.success('Chat convertido a ticket exitosamente');
        return true;
      }
      throw new Error(data.message || 'Error al convertir a ticket');
    } catch (error) {
      console.error('Error en convertToTicket:', error);
      toast.error('Error al convertir a ticket');
      throw error;
    }
  };

  // Función para cerrar chat
  const closeChat = async (chatId) => {
    try {
      const response = await fetch(`${API_BASE}/chat/close/${chatId}`, {
        method: 'PATCH',
      });
      await handleFetchError(response);
      setSelectedChat(null);
      await fetchChats();
      toast.success('Chat cerrado exitosamente');
    } catch (err) {
      console.error('Error closing chat:', err);
      toast.error('Error al cerrar el chat');
    }
  };

  // Función para seleccionar chat
  const handleSelectChat = async (chat) => {
    setSelectedChat(chat);
    await fetchMessages(chat.id);

    if (role === 'support' && !chat.support_id) {
      try {
        const response = await fetch(`${API_BASE}/chat/${chat.id}/assign`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            support_id: userLoged.id,
            support_name: userLoged.name,
          }),
        });

        const data = await handleFetchError(response);
        if (data.success) {
          setSelectedChat(prev => ({
            ...prev,
            support_id: userLoged.id,
            support_name: userLoged.name,
          }));
          await fetchChats();
        }
      } catch (err) {
        console.error('Error assigning chat:', err);
        toast.error('Error al asignar el chat');
      }
    }
  };

  // Efecto para actualización periódica
  useEffect(() => {
    let interval;

    if (!loading) {
      // Actualización inicial
      fetchChats();

      // Configurar intervalo de actualización
      interval = setInterval(() => {
        fetchChats();
      }, 5000); // Actualizar cada 5 segundos
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [loading, fetchChats]);

  // Efecto para actualización de mensajes
  useEffect(() => {
    let interval;

    if (selectedChat?.id) {
      interval = setInterval(() => {
        fetchMessages(selectedChat.id);
      }, 3000); // Actualizar mensajes cada 3 segundos
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [selectedChat?.id, fetchMessages]);

  return {
    chats,
    selectedChat,
    messages,
    loading,
    error,
    handleSelectChat,
    sendMessage,
    closeChat,
    transferChat,
    convertToTicket,
    refreshChats: fetchChats,
  };
};
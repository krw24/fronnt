import { useState, useEffect } from "react";

export const useChatAdmin = () => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const support_id = 1; // ID del agente de soporte (deberías obtenerlo de tu sistema de autenticación)

    // Obtener todos los chats
    const fetchChats = async () => {
        try {
            const response = await fetch('http://localhost:3001/chats');
            const data = await response.json();
            setChats(data);
        } catch (err) {
            setError('Error al cargar los chats');
            console.error(err);
        }
    };

    // Obtener mensajes de un chat específico
    const fetchMessages = async (chatId) => {
        try {
            const response = await fetch(`http://localhost:3001/chat/${chatId}/messages`);
            const data = await response.json();
            setMessages(data);
        } catch (err) {
            setError('Error al cargar los mensajes');
            console.error(err);
        }
    };

    // Asignar chat a un agente
    const assignChat = async (chatId) => {
        try {
            await fetch(`http://localhost:3001/chat/${chatId}/assign`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ support_id }),
            });
        } catch (err) {
            setError('Error al asignar el chat');
            console.error(err);
        }
    };

    // Enviar mensaje
    const sendMessage = async (chatId, message) => {
        try {
            const response = await fetch(`http://localhost:3001/chat/${chatId}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sender_id: support_id,
                    message
                }),
            });
            
            if (response.ok) {
                fetchMessages(chatId);
            }
        } catch (err) {
            setError('Error al enviar el mensaje');
            console.error(err);
        }
    };

    // Cerrar chat
    const closeChat = async (chatId) => {
        try {
            await fetch(`http://localhost:3001/chat/close/${chatId}`, {
                method: 'PATCH'
            });
            fetchChats(); // Actualizar lista de chats
        } catch (err) {
            setError('Error al cerrar el chat');
            console.error(err);
        }
    };

    // Seleccionar un chat y cargar sus mensajes
    const handleSelectChat = async (chat) => {
        setSelectedChat(chat);
        if (chat) {
            await fetchMessages(chat.id);
            if (!chat.support_id) {
                await assignChat(chat.id);
            }
        }
    };

    // Efecto para cargar chats iniciales
    useEffect(() => {
        fetchChats();
        const interval = setInterval(fetchChats, 30000); // Actualizar cada 30 segundos
        return () => clearInterval(interval);
    }, []);

    // Efecto para actualizar mensajes del chat seleccionado
    useEffect(() => {
        if (selectedChat) {
            const interval = setInterval(() => {
                fetchMessages(selectedChat.id);
            }, 5000); // Actualizar cada 5 segundos
            return () => clearInterval(interval);
        }
    }, [selectedChat]);

    return {
        chats,
        selectedChat,
        messages,
        loading,
        error,
        handleSelectChat,
        sendMessage,
        closeChat,
    };
};
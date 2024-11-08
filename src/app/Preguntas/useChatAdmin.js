import { useState, useEffect } from "react";

export const useChatAdmin = (role) => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const support_id = 1; // Obtenido del sistema de autenticación
    const API_BASE = "http://localhost:3001";

    // Obtener todos los chats según el rol
    const fetchChats = async () => {
        setLoading(true);
        try {
            const url = `${API_BASE}/chats`
            const response = await fetch(url);
            const data = await response.json();
            setChats(data);
        } catch (err) {
            setError("Error al cargar los chats");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Obtener mensajes de un chat específico
    const fetchMessages = async (chatId) => {
        try {
            const response = await fetch(`${API_BASE}/chat/${chatId}/messages`);
            const data = await response.json();
            setMessages(data);
        } catch (err) {
            setError("Error al cargar los mensajes");
            console.error(err);
        }
    };

    // Asignar chat a un agente si no está asignado
    const assignChat = async (chatId) => {
        if (!selectedChat.support_id) {
            try {
                await fetch(`${API_BASE}/chat/${chatId}/assign`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ support_id }),
                });
                // Actualizamos el chat local para reflejar la asignación
                setSelectedChat((prev) => ({ ...prev, support_id }));
            } catch (err) {
                setError("Error al asignar el chat");
                console.error(err);
            }
        }
    };

    // Enviar mensaje
    const sendMessage = async (chatId, message) => {
        try {
            const response = await fetch(`${API_BASE}/chat/${chatId}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender_id: support_id,
                    message,
                }),
            });

            if (response.ok) {
                await fetchMessages(chatId);
            }
        } catch (err) {
            setError("Error al enviar el mensaje");
            console.error(err);
        }
    };

    // Cerrar chat
    const closeChat = async (chatId) => {
        try {
            await fetch(`${API_BASE}/chat/close/${chatId}`, {
                method: "PATCH",
            });
            setSelectedChat(null);
            fetchChats();
        } catch (err) {
            setError("Error al cerrar el chat");
            console.error(err);
        }
    };

    // Seleccionar un chat
    const handleSelectChat = async (chat) => {
        setSelectedChat(chat);
        await fetchMessages(chat.id);
        if (role === "support" && !chat.support_id) {
            await assignChat(chat.id);
        }
    };

    // Efecto para cargar chats iniciales
    useEffect(() => {
        fetchChats();
        const interval = setInterval(fetchChats, 30000); // Actualizar cada 30 segundos
        return () => clearInterval(interval);
    }, [role]);

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

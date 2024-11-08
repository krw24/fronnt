import { useState, useEffect, useRef } from 'react';

export default function useChatLogic(userLoged) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [chatId, setChatId] = useState(null);
    const messagesEndRef = useRef(null);
    const intervalRef = useRef(null);

    const INTERVALO_ACTUALIZACION = 3000;
    const API_URL = 'http://localhost:3001';

    // Limpiar intervalo cuando el componente se desmonte
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Iniciar chat cuando el usuario está logueado
    useEffect(() => {
        if (userLoged?.id && !chatId) {
            iniciarChat();
        }
    }, [userLoged]);

    const iniciarChat = async () => {
        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userLoged.id })
            });

            if (!response.ok) {
                throw new Error('Error al iniciar el chat');
            }

            const data = await response.json();
            setChatId(data.insertId);

            // Iniciar actualización periódica de mensajes
            actualizarMensajes();
            intervalRef.current = setInterval(actualizarMensajes, INTERVALO_ACTUALIZACION);

        } catch (error) {
            console.error('Error al iniciar chat:', error);
        }
    };

    const actualizarMensajes = async () => {
        if (!chatId) return;

        try {
            const response = await fetch(`${API_URL}/chat/${chatId}/messages`);
            
            if (!response.ok) {
                throw new Error('Error al obtener mensajes');
            }

            const data = await response.json();
            setMessages(data);
            scrollToBottom();
        } catch (error) {
            console.error('Error al actualizar mensajes:', error);
        }
    };

    const enviarMensaje = async () => {
        if (!inputMessage.trim() || !chatId) return;

        try {
            const response = await fetch(`${API_URL}/chat/${chatId}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sender_id: userLoged.id,
                    message: inputMessage.trim()
                })
            });

            if (!response.ok) {
                throw new Error('Error al enviar mensaje');
            }

            setInputMessage('');
            await actualizarMensajes();
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
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
        chatId
    };
}
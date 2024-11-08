import { useState, useEffect, useRef } from "react";
import { useChatAdmin } from "../../app/Preguntas/useChatAdmin";

export const ChatAdmin = ({ role }) => {
    const {
        chats,
        selectedChat,
        messages,
        loading,
        error,
        handleSelectChat,
        sendMessage,
        closeChat,
    } = useChatAdmin(role);

    const [newMessage, setNewMessage] = useState("");
    const [unreadCounts, setUnreadCounts] = useState({});
    const messagesEndRef = useRef(null);

    // Maneja el envío de mensajes
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        sendMessage(selectedChat.id, newMessage);
        setNewMessage("");
    };

    // Maneja el scroll automático al enviar o recibir un mensaje nuevo
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Actualiza el contador de mensajes no leídos
    useEffect(() => {
        if (selectedChat) {
            setUnreadCounts((prevCounts) => ({
                ...prevCounts,
                [selectedChat.id]: 0, // Resetea los mensajes no leídos del chat seleccionado
            }));
        }
    }, [selectedChat]);

    // Maneja la llegada de nuevos mensajes
    useEffect(() => {
        if (selectedChat) {
            scrollToBottom();
        } else {
            // Incrementa el contador de mensajes no leídos si no está seleccionado
            chats.forEach((chat) => {
                setUnreadCounts((prevCounts) => ({
                    ...prevCounts,
                    [chat.id]: prevCounts[chat.id] || chat.newMessages || 0,
                }));
            });
        }
    }, [messages, chats]);

    if (loading) return <div className="flex items-center justify-center h-full">Cargando...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="grid grid-cols-[350px_1fr] gap-5 h-min-screen p-5 bg-gray-100">
            {/* Lista de chats */}
            <div className="border-r border-gray-300 pr-5 overflow-y-auto bg-white rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4 p-4"> 
                    {role === "admin" ? "Todos los chats" : "Tus chats activos"}
                </h2>
                {chats.map((chat) => {
                    const unreadCount = unreadCounts[chat.id] || 0;
                    return (
                        <div
                            key={chat.id}
                            className={`flex justify-between items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 
                                ${selectedChat?.id === chat.id ? "bg-blue-100" : ""}`}
                            onClick={() => handleSelectChat(chat)}
                        >
                            <div>
                                <p className="font-medium text-gray-800">{chat.user_name}</p>
                                <p className="text-sm text-gray-500 truncate">
                                    {chat.last_message}
                                </p>
                            </div>
                            {unreadCount > 0 && (
                                <span className="flex items-center justify-center h-6 w-6 text-xs font-bold bg-red-500 text-white rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Panel de mensajes */}
            <div className="flex flex-col h-[calc(100vh-110px)] bg-red-400 rounded-lg shadow">
                {selectedChat ? (
                    <>
                        <div className="flex-1 overflow-y-auto p-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`mb-4 flex ${
                                        msg.sender_id === 1 ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`inline-block p-3 rounded-lg max-w-xs shadow
                                            ${msg.sender_id === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                                    >
                                        <p>{msg.message}</p>
                                        <small className="text-xs block mt-1 text-gray-300">
                                            {new Date(msg.created_at).toLocaleTimeString()}
                                        </small>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input para enviar mensaje */}
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="flex-1 p-2 border rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Escribe un mensaje..."
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Selecciona una conversación para ver los mensajes
                    </div>
                )}
            </div>
        </div>
    );
};

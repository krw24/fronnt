import { useState } from "react";
import { useChatAdmin } from "../../app/Preguntas/useChatAdmin";

export const ChatAdmin = () => {
    const {
        chats,
        selectedChat,
        messages,
        loading,
        error,
        handleSelectChat,
        sendMessage,
        closeChat,
    } = useChatAdmin();

    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        
        sendMessage(selectedChat.id, newMessage);
        setNewMessage("");
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-[300px_1fr] gap-5 h-screen p-5">
            {/* Lista de chats */}
            <div className="border-r border-gray-200 pr-5 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Conversaciones activas</h2>
                {chats.map((chat) => (
                    <div 
                        key={chat.id} 
                        className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 
                            ${selectedChat?.id === chat.id ? 'bg-blue-50' : ''}`}
                        onClick={() => handleSelectChat(chat)}
                    >
                        <p className="font-medium text-gray-800">{chat.user_name}</p>
                        <p className="text-sm text-gray-500 truncate">{chat.last_message}</p>
                        <span className={`text-xs px-2 py-1 rounded-full 
                            ${chat.support_id ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {chat.support_id ? 'Asignado' : 'Sin asignar'}
                        </span>
                    </div>
                ))}
            </div>

            {/* Panel de mensajes */}
            <div className="flex flex-col h-full">
                {selectedChat ? (
                    <>
                        <div className="flex-1 overflow-y-auto p-4">
                            {messages.map((msg, index) => (
                                <div key={index} 
                                    className={`mb-4 ${msg.sender_id === 1 ? 'text-right' : 'text-left'}`}>
                                    <div className={`inline-block p-3 rounded-lg 
                                        ${msg.sender_id === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                        <p>{msg.message}</p>
                                        <small className="text-xs">
                                            {new Date(msg.created_at).toLocaleString()}
                                        </small>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSendMessage} className="p-4 border-t">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="flex-1 p-2 border rounded"
                                    placeholder="Escribe un mensaje..."
                                />
                                <button 
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
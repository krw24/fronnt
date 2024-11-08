import { useState, useEffect, useRef } from "react";
import { useChatAdmin } from "../../app/Preguntas/useChatAdmin";
import useQuestions from "../../app/Preguntas/useQuestions";

export const ChatAdmin = ({ role }) => {
  const { userLoged } = useQuestions();
  const [isAssigning, setIsAssigning] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [unreadCounts, setUnreadCounts] = useState({});
  const messagesEndRef = useRef(null);

  const {
    chats,
    selectedChat,
    messages,
    loading,
    error,
    handleSelectChat,
    sendMessage,
    closeChat,
  } = useChatAdmin(role, userLoged);

  // Maneja el envío de mensajes
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage(selectedChat.id, newMessage);
    setNewMessage("");
  };

  // Maneja el scroll automático
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // Actualiza el contador de mensajes no leídos
  useEffect(() => {
    if (selectedChat) {
      setUnreadCounts((prevCounts) => ({
        ...prevCounts,
        [selectedChat.id]: 0,
      }));
    }
  }, [selectedChat]);

  // Maneja la llegada de nuevos mensajes
  useEffect(() => {
    if (!selectedChat) {
      chats.forEach((chat) => {
        const unreadMessages = messages.filter(
          (msg) => 
            msg.chat_id === chat.id && 
            msg.sender_id !== userLoged.id &&
            !msg.read
        ).length;

        setUnreadCounts((prevCounts) => ({
          ...prevCounts,
          [chat.id]: unreadMessages,
        }));
      });
    }
  }, [messages, chats, selectedChat, userLoged.id]);

  const handleChatSelection = async (chat) => {
    setIsAssigning(true);
    try {
      await handleSelectChat(chat);
    } catch (error) {
      console.error("Error al seleccionar chat:", error);
    } finally {
      setIsAssigning(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500 bg-red-100 p-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[350px_1fr] gap-5 h-min-screen p-5 bg-gray-100">
      {/* Lista de chats */}
      <div className="border-r border-gray-300 pr-5 overflow-y-auto bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 p-4">
          {role === "admin" ? "Todos los chats" : "Tus chats activos"}
        </h2>
        {chats.map((chat) => {
          const unreadCount = unreadCounts[chat.id] || 0;
          const isAssigned = chat.support_id !== null;
          
          return (
            <div
              key={chat.id}
              className={`
                flex justify-between items-center p-4 border-b border-gray-200 
                cursor-pointer hover:bg-gray-50 relative
                ${selectedChat?.id === chat.id ? "bg-blue-100" : ""}
                ${isAssigning && selectedChat?.id === chat.id ? "opacity-50" : ""}
              `}
              onClick={() => handleChatSelection(chat)}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-800">
                    {chat.user_name}
                    {isAssigned && (
                      <span className="ml-2 text-xs text-green-600">
                        (Asignado a: {chat.support_name || "Agente"})
                      </span>
                    )}
                  </p>
                  {chat.status === 'open' && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Activo
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate mt-1">
                  {chat.last_message || "Sin mensajes"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(chat.created_at).toLocaleString()}
                </p>
              </div>
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 flex items-center justify-center h-6 w-6 text-xs font-bold bg-red-500 text-white rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Panel de mensajes */}
      <div className="flex flex-col h-[calc(100vh-110px)] bg-white rounded-lg shadow">
        {selectedChat ? (
          <>
            {/* Cabecera del chat */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">
                    Chat con {selectedChat.user_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedChat.support_id 
                      ? `Asignado a: ${selectedChat.support_name}`
                      : "Sin asignar"}
                  </p>
                </div>
                <button
                  onClick={() => closeChat(selectedChat.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Cerrar Chat
                </button>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    msg.sender_id === userLoged.id ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      inline-block p-3 rounded-lg max-w-xs shadow
                      ${
                        msg.sender_id === userLoged.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }
                    `}
                  >
                    <p className="text-sm font-medium mb-1">{msg.sender_name}</p>
                    <p>{msg.message}</p>
                    <small className={`text-xs block mt-1 ${
                      msg.sender_id === userLoged.id 
                        ? "text-blue-100" 
                        : "text-gray-500"
                    }`}>
                      {new Date(msg.created_at).toLocaleTimeString()}
                    </small>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input para enviar mensaje */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-200 bg-white"
            >
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 p-3 border rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Escribe un mensaje..."
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                  disabled={!newMessage.trim()}
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
import { useState, useEffect, useRef } from "react";
import { useChatAdmin } from "../../app/Preguntas/useChatAdmin";
import useQuestions from "../../app/Preguntas/useQuestions";
import { FiSend, FiMessageSquare, FiUser, FiClock } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

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

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage(selectedChat.id, newMessage);
    setNewMessage("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (selectedChat) {
      setUnreadCounts((prevCounts) => ({
        ...prevCounts,
        [selectedChat.id]: 0,
      }));
    }
  }, [selectedChat]);

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
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 bg-red-100 p-4 rounded-lg shadow-md">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[890px] flex bg-gray-100">
      {/* Panel lateral de chats */}
      <div className="w-[380px] bg-white shadow-lg flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <FiMessageSquare className="text-blue-600" />
            {role === "admin" ? "Panel de Chats" : "Mis Conversaciones"}
          </h2>
        </div>

        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {chats.map((chat) => {
            const unreadCount = unreadCounts[chat.id] || 0;
            const isAssigned = chat.support_id !== null;
            
            return (
              <div
                key={chat.id}
                className={`
                  p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50
                  transition-all duration-200 relative
                  ${selectedChat?.id === chat.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""}
                  ${isAssigning && selectedChat?.id === chat.id ? "opacity-50" : ""}
                `}
                onClick={() => handleChatSelection(chat)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <FiUser className="text-gray-400" />
                      <p className="font-medium text-gray-900 truncate">
                        {chat.user_name}
                      </p>
                    </div>
                    {isAssigned && (
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <FiUser className="text-green-500" />
                        {chat.support_name || "Agente"}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mt-1 truncate">
                      {chat.last_message || "Sin mensajes"}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <FiClock />
                      {new Date(chat.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {chat.status === 'open' && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Activo
                      </span>
                    )}
                    {unreadCount > 0 && (
                      <span className="absolute top-2 right-2 flex items-center justify-center h-6 w-6 text-xs font-bold bg-red-500 text-white rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Panel principal de mensajes */}
      <div className="flex-1 flex flex-col h-[890px]">
        {selectedChat ? (
          <>
            <div className="p-4 bg-white border-b border-gray-200 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <MdClose />
                  Cerrar Chat
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 custom-scrollbar">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    msg.sender_id === userLoged.id ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[70%] p-4 rounded-lg shadow-sm
                      ${msg.sender_id === userLoged.id
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none"
                      }
                    `}
                  >
                    <p className="text-sm font-medium mb-1">{msg.sender_name}</p>
                    <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                    <p className={`text-xs mt-2 ${
                      msg.sender_id === userLoged.id ? "text-blue-100" : "text-gray-500"
                    }`}>
                      {new Date(msg.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSendMessage}
              className="p-4 bg-white border-t border-gray-200"
            >
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Escribe tu mensaje..."
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!newMessage.trim()}
                >
                  <FiSend />
                  Enviar
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <FiMessageSquare className="text-6xl mb-4" />
            <p className="text-xl">Selecciona una conversación para comenzar</p>
          </div>
        )}
      </div>
    </div>
  );
};
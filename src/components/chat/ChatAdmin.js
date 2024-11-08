import { useState, useEffect, useRef } from "react";
import { useChatAdmin } from "../../app/Preguntas/useChatAdmin";
import useQuestions from "../../app/Preguntas/useQuestions";
import { toast } from 'react-hot-toast';
import { FiSend, FiRefreshCw, FiMessageSquare, FiUser, FiClock } from 'react-icons/fi';
import { HiTicket } from 'react-icons/hi';
import { BiTransfer } from 'react-icons/bi';
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

  useEffect(() => {
    // console.log('Usuario logueado:', userLoged);
    if (!userLoged) {
      toast.error('No hay usuario logueado');
    }
  }, [userLoged]);
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    try {
      await sendMessage(selectedChat.id, newMessage);
      setNewMessage(""); // Limpiar el input solo si el envío fue exitoso
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      toast.error("No se pudo enviar el mensaje");
    }
  };


  const handleChatSelection = async (chat) => {
    setIsAssigning(true);
    try {
      await handleSelectChat(chat);
    } catch (error) {
      console.error("Error al seleccionar chat:", error);
      toast.error("Error al seleccionar el chat");
    } finally {
      setIsAssigning(false);
    }
  };

  // Scroll automático mejorado
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="grid grid-cols-[320px_1fr] h-screen bg-gray-50">
      {/* Panel lateral de chats */}
      <div className="bg-white border-r border-gray-200 flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FiMessageSquare className="text-blue-600" />
            {role === "admin" ? "Panel de Chats" : "Mis Conversaciones"}
          </h2>
        </div>

        <div className="overflow-y-auto flex-1">
          {chats.map((chat) => {
            const unreadCount = unreadCounts[chat.id] || 0;
            const isAssigned = chat.support_id !== null;

            return (
              <div
                key={chat.id}
                onClick={() => handleChatSelection(chat)}
                className={`
                  p-4 border-b border-gray-100 cursor-pointer
                  transition-all duration-200 hover:bg-gray-50
                  ${selectedChat?.id === chat.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""}
                `}
              >
                <div className="flex items-start justify-between">
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
                      <span className="flex items-center justify-center h-6 w-6 text-xs font-bold bg-red-500 text-white rounded-full">
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
      <div className="flex flex-col h-full">
        {selectedChat ? (
          <>
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {selectedChat.user_name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedChat.support_id
                      ? `Asignado a: ${selectedChat.support_name}`
                      : "Sin asignar"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {role === 'admin' && (
                    <button
                      onClick={() => {/* ... código existente ... */ }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                    >
                      <BiTransfer />
                      Transferir
                    </button>
                  )}
                  <button
                    onClick={() => {/* ... código existente ... */ }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    <HiTicket />
                    Crear Ticket
                  </button>
                  <button
                    onClick={() => {/* ... código existente ... */ }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <MdClose />
                    Cerrar
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${msg.sender_id === userLoged.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`
                      max-w-[70%] p-3 rounded-lg shadow-sm
                      ${msg.sender_id === userLoged.id
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none"
                      }
                    `}
                  >
                    <p className="text-sm font-medium mb-1">
                      {msg.sender_name}
                    </p>
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-2 ${msg.sender_id === userLoged.id ? "text-blue-100" : "text-gray-500"
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
                  disabled={!newMessage.trim() || !selectedChat}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
"use client";
import { useState } from "react";

const MessageItem = ({ mensaje, isCurrentUser }) => {
  const messageTime = new Date(mensaje.created_at).toLocaleString('es', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit'
  });

  return (
    <div className={`mb-4 flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[70%] p-3 rounded-lg shadow-sm
          ${isCurrentUser 
            ? "bg-indigo-500 text-white rounded-br-none" 
            : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
          }
        `}
      >
        <p className={`text-xs font-medium mb-1 ${
          isCurrentUser ? "text-indigo-100" : "text-gray-500"
        }`}>
          {isCurrentUser ? 'Tú' : mensaje.sender_name || 'Agente'}
        </p>
        <p className="text-sm">{mensaje.message}</p>
        <p className={`text-xs mt-1 ${
          isCurrentUser ? "text-indigo-100" : "text-gray-400"
        }`}>
          {messageTime}
        </p>
      </div>
    </div>
  );
};

export const Chat = ({ 
    userLoged, 
    chatIsOpen, 
    setChatIsOpen,
    messages,
    inputMessage,
    setInputMessage,
    enviarMensaje,
    messagesEndRef,
    agenteAsignado,
    esperandoAgente,
    mensajesNoLeidos
  }) => {
    const cerrarChat = () => {
      setChatIsOpen(false);
    };

    const abrirChat = () => {
      setChatIsOpen(true);
    };

  if (!chatIsOpen) {
    return (
      <div className="fixed flex flex-col bottom-3 right-3 z-50">
        <div className="relative">
          <button
            onClick={abrirChat}
            className="flex items-center justify-center p-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </button>
          {mensajesNoLeidos > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-6 h-6 flex items-center justify-center px-2 animate-pulse">
              {mensajesNoLeidos}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed flex flex-col bottom-0 right-10 w-[400px] h-[550px] border-[1px] rounded-t-xl bg-white shadow-xl z-50">
      <div className="w-full h-[60px] flex justify-between items-center px-4 bg-indigo-500 rounded-t-xl">
        <h3 className="text-white font-medium">
          {esperandoAgente
            ? "Soporte Tecnico "
            : agenteAsignado
            ? `Agente: ${agenteAsignado.nombre}`
            : "Chat de Soporte"}
        </h3>

        <button
          onClick={cerrarChat}
          className="text-white hover:bg-indigo-600 p-1 rounded-full transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((mensaje, index) => (
          <MessageItem 
            key={index}
            mensaje={mensaje}
            isCurrentUser={mensaje.sender_id === userLoged.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-white">
        <form onSubmit={(e) => {
          e.preventDefault();
          if (inputMessage.trim()) {
            enviarMensaje();
          }
        }}>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
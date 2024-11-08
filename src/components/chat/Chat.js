"use client";
import useChatLogic from "../../app/Preguntas/useChatClient.js";

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

  if (!chatIsOpen) {
    return (
      <div className="absolute flex flex-col bottom-3 right-3">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10 text-indigo-500 cursor-pointer hover:text-indigo-600 transition-colors"
            onClick={abrirChat}
          >
            <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379" />
          </svg>
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
    <div className="absolute flex flex-col bottom-0 right-10 w-[400px] h-[550px] border-[1px] rounded-t-xl">
      <div className="w-full h-[60px] flex justify-between items-center px-4 bg-indigo-500 rounded-t-xl">
        <h3 className="text-white font-medium">
          {esperandoAgente
            ? "Esperando asignación de agente..."
            : agenteAsignado
            ? `Agente: ${agenteAsignado.nombre}`
            : "Chat de Ayuda"}
        </h3>

        <button
          onClick={cerrarChat}
          className="hover:bg-slate-300 p-1 rounded-full transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((mensaje, index) => (
          <div
            key={index}
            className={`mb-4 ${
              mensaje.sender_id === userLoged.id ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                mensaje.sender_id === userLoged.id
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <p>{mensaje.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-white">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && enviarMensaje()}
          placeholder="Escribe tu mensaje..."
          className="w-full px-4 py-2 border rounded-full"
        />
      </div>
    </div>
  );
};

"use client";
import useChatLogic from '../../app/Preguntas/chatLogic';

export default function Chat({ userLoged, chatIsOpen, setChatIsOpen }) {
    const {
        messages,
        inputMessage,
        setInputMessage,
        enviarMensaje,
        messagesEndRef
    } = useChatLogic(userLoged);

    if (!chatIsOpen) {
        return (
            <div className="absolute flex flex-col bottom-3 right-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-10 text-indigo-500 cursor-pointer"
                    onClick={() => setChatIsOpen(true)}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                </svg>
            </div>
        );
    }

    return (
        <div className="absolute flex flex-col bottom-0 right-10 w-[400px] h-[550px] border-[1px] rounded-t-xl">
            <div className="w-full h-[60px] flex justify-between items-center px-4 bg-indigo-500 rounded-t-xl">
                <h3 className="text-white font-medium">Chat de Ayuda</h3>
                <button
                    onClick={() => setChatIsOpen(false)}
                    className="hover:bg-slate-300 p-1 rounded-full transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 text-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages?.map((mensaje, index) => (
                    <div
                        key={index}
                        className={`message ${
                            mensaje.sender_id === userLoged.id
                                ? "flex justify-end"
                                : ""
                        } mb-4`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                                mensaje.sender_id === userLoged.id
                                    ? "bg-indigo-500 text-white"
                                    : "bg-white border"
                            }`}
                        >
                            <p>{mensaje.message}</p>
                            <small className="text-xs opacity-75">
                                {new Date(mensaje.created_at).toLocaleTimeString()}
                            </small>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && enviarMensaje()}
                        placeholder="Escribe tu mensaje..."
                        className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={enviarMensaje}
                        className="p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
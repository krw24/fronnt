"use client";

import { useEffect, useState } from "react"; 
import { FiSearch, FiLogOut } from "react-icons/fi";
import useQuestions from "./useQuestions";
import useChatClient from "./useChatClient";
import { Chat } from "../../components/chat/Chat.js";
import { Toaster } from "react-hot-toast";
import { TiMessages } from "react-icons/ti";
import { LuMessageSquarePlus } from "react-icons/lu";

const Preguntas = () => {
  const { userLoged, chatIsOpen, setChatIsOpen, onSubmit, handleSubmit, register } = useQuestions();
  const [view, setView] = useState(0);
  const chatLogic = useChatClient(userLoged, chatIsOpen);

  return (
    <div className="w-full h-screen flex flex-row relative">
      <div className="w-24 h-screen flex flex-col  bg-indigo-400">
        <div className="w-full h-24 flex justify-center items-center bg-indigo-300"></div>
        <div onClick={() => setView(0)} className="w-full h-20 flex justify-center items-center border-b-[1px] border-indigo-100 hover:opacity-60 cursor-pointer">
          <LuMessageSquarePlus className="text-5xl text-indigo-100" />
        </div>
        <div onClick={() => setView(1)} className="w-full h-20 flex justify-center items-center border-b-[1px] border-indigo-100 hover:opacity-60 cursor-pointer">
          <TiMessages className="text-5xl text-indigo-100" />
        </div>
        <div className="w-full h-24 flex justify-center items-center "></div>
        <div className="w-full h-24 flex justify-center items-center "></div>
      </div>
      <div className="w-full h-screen flex flex-col">
        <div className="w-full h-24 flex items-center justify-between px-8 font-semibold bg-indigo-300">
          <div className="w-full text-6xl  font-semibold ">
            Soporte
          </div>
          <div className=" flex items-center flex-row gap-2">
            <div className="w-72 flex items-center gap-2 justify-center">
              <div className="w-12 h-12 bg-white border-[1px] border-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-indigo-500">
                  {userLoged?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex flex-row gap-2">
                <div className="text-lg font-semibold">{userLoged.name}</div>
                <div
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                  className="cursor-pointer translate-x-1 hover:translate-x-2 transition-all duration-300"
                >
                  <FiLogOut className="text-3xl pl-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[calc(100vh-88px)] flex items-center justify-center">
          { view === 0 &&
            <div className="w-[500px] h-[400px] p-5 bg-white rounded-xl shadow-xl ">
              <div className="w-full flex flex-col gap-2"> 
                <div className="flex justify-center font-semibold text-3xl">Generador de PQRs</div>
                <div className="flex justify-center font-light text-md text-center">
                  En este apartado podrás crear una petición para que un administrador pueda responderte lo antes posible.
                </div>
              </div>
              <form className="w-full flex flex-col gap-4 h-full p-4 pt-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative h-11">
                  <select
                    id="testMode"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-[2.5px] border-gray-300  focus:outline-none focus:ring-0 focus:border-[#a5aefc] focus:border-[2.5px] peer"
                    defaultValue={""}
                    {...register("type")}
                  >
                    <option disabled value={""}>
                      Seleccione una opción
                    </option>
                    <option value="peticion">Peticion</option>
                    <option value="queja">Queja</option>
                    <option value="reclamo">Reclamo</option>
                  </select>
                  <label
                    htmlFor="testMode"
                    className="absolute text-md  dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#a5aefc]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Tipo de peticion
                  </label>
                </div>
                <div className="relative ">
                  <textarea
                    id="description"
                    rows={4}
                    className="min-h-[111px] max-h-[111px] block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-[2.5px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#a5aefc] focus:border-[2.5px] peer"
                    placeholder=" "
                    {...register("description")}
                  />
                  <label
                    htmlFor="description"
                    className="absolute text-md text-slate-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#a5aefc]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[20%] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2"
                  >
                    Descripcion
                  </label>
                </div>
                <div className="w-full flex justify-end">
                  <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          }
          {
            view === 1 &&
            <div className="w-[500px] h-[400px] p-5 bg-black rounded-xl shadow-xl ">
                
            </div>
          }
            
        </div>

      </div>
      {chatIsOpen ? (
        <Chat
          userLoged={userLoged}
          chatIsOpen={chatIsOpen}
          setChatIsOpen={setChatIsOpen}
          {...chatLogic}
        />
      ) : (
        <div className="absolute flex flex-col bottom-3 right-3">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-10 text-indigo-500 cursor-pointer hover:text-indigo-600 transition-colors"
              onClick={() => setChatIsOpen(true)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            {chatLogic.mensajesNoLeidos > 0 ? (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-6 h-6 flex items-center justify-center px-2 animate-pulse">
                {chatLogic.mensajesNoLeidos}
              </span>
            ) : (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-6 h-6 flex items-center justify-center px-2 animate-pulse">
                0
              </span>
            )}
          </div>
        </div>
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default Preguntas;

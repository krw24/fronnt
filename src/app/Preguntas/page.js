"use client";

import { useState } from "react"; 
import { FiSearch, FiLogOut } from "react-icons/fi";
import useQuestions from "./useQuestions";
import useChatClient from "./useChatClient";
import { Chat } from "../../components/chat/Chat.js";
import { Toaster } from "react-hot-toast";
import { TiMessages } from "react-icons/ti";
import { LuMessageSquarePlus } from "react-icons/lu";
import Modal from "../../components/modal/Modal.js"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

const Preguntas = () => {


  const [view, setView] = useState(0);
  
  
  const { 
    userLoged, 
    chatIsOpen, 
    setChatIsOpen, 
    onSubmit, 
    handleSubmit, 
    register ,


    formatText,
    handleEditPregunta,
    isEditModalOpen,
    setIsEditModalOpen,
    editPregunta,
    setEditPregunta,
    busqueda,
    setBusqueda,
    preguntasActuales,
    paginaActual,
    cambiarPagina,
    totalPaginas
  } = useQuestions({view});

  const chatLogic = useChatClient(userLoged, chatIsOpen);

  const SkeletonCell = () => {
    return (
        <div className="bg-gray-300 h-6 w-full rounded-full mb-4 animate-pulse"></div>
    );
  };


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
            (
              <div className="container mx-auto pt-6 flex flex-col gap-4">
                                <div className="w-full flex flex-row gap-2 items-center">
                                    <div className="relative flex flex-row gap-2 items-center">
                                        <FiSearch className="absolute left-2 text-2xl text-gray-500" />
                                        <input
                                            className="p-2 pl-10 pr-4 border-[1.5px] border-gray-300 rounded-2xl outline-none"
                                            type="text"
                                            placeholder="Buscar..."
                                            value={busqueda}
                                            onChange={(e) => setBusqueda(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="min-w-full overflow-y-auto shadow-lg mt-2 shadow-slate-300 rounded-lg">
                                    <table className="min-w-full table-auto bg-white  rounded-lg">
                                        <thead>
                                            <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm leading-normal">
                                                <th className="py-3 px-6">ID</th>
                                                <th className="py-3 px-6">Id Usuario</th>
                                                <th className="py-3 px-6">Contestado por</th>
                                                <th className="py-3 px-6">Tipo</th>
                                                <th className="py-3 px-6">Pregunta</th>
                                                <th className="py-3 px-6">Respuesta</th>
                                                <th className="py-3 px-6">Estado</th>
                                                <th className="py-3 px-6">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-md  font-normal">
                                            {preguntasActuales.map((pregunta) => (
                                                <tr
                                                    key={pregunta.id}
                                                    className="border-b border-gray-200 hover:bg-gray-100"
                                                >
                                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                                        {pregunta.id}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">{pregunta.user_id}</td>
                                                    <td className="py-3 px-6 text-left">
                                                        {
                                                            pregunta.support_name ? pregunta.support_name : <SkeletonCell />
                                                        }
                                                    </td>
                                                    <td className="py-3 px-6 text-left">{pregunta.type}</td>
                                                    <td className="py-3 px-6 text-left">{formatText(pregunta.description)}</td>
                                                    <td className="py-3 px-6 text-left">
                                                        {
                                                            pregunta.support_response ? formatText(pregunta.support_response) : <SkeletonCell />
                                                        }
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {
                                                            pregunta.status == 'pendiente' ? <div className="bg-orange-400 text-black font-bold py-1 px-2 flex justify-center rounded-md">Pendiente</div> : <div className="bg-indigo-300 text-white font-bold py-1 px-4 flex justify-center rounded-md">Respondido</div>
                                                        }</td>
                                                    <td className="py-3 px-6 text-center flex justify-center gap-2">
                                                        <button
                                                            onClick={() => handleEditPregunta(pregunta.id)}
                                                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full">
                                                            <IoMdEye />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="w-full flex justify-end">
                                    <div className="flex items-center gap-2 bg-white p-4 rounded-lg text-lg shadow">
                                        <button
                                            onClick={() => cambiarPagina(paginaActual - 1)}
                                            disabled={paginaActual === 1}
                                            className={`p-2 rounded-full ${paginaActual === 1
                                                ? 'text-gray-400 cursor-not-allowed'
                                                : 'text-[#7F88D5] hover:bg-[#7F88D5] hover:text-white'
                                                }`}
                                        >
                                            <IoIosArrowBack />
                                        </button>

                                        {(() => {
                                            let paginas = [];
                                            if (totalPaginas <= 5) {
                                                // Si hay 5 o menos páginas, mostrar todas
                                                paginas = [...Array(totalPaginas)].map((_, i) => i + 1);
                                            } else {
                                                // Si estamos en las primeras 3 páginas
                                                if (paginaActual <= 3) {
                                                    paginas = [1, 2, 3, '...', totalPaginas];
                                                }
                                                // Si estamos en las últimas 3 páginas
                                                else if (paginaActual >= totalPaginas - 2) {
                                                    paginas = [1, '...', totalPaginas - 2, totalPaginas - 1, totalPaginas];
                                                }
                                                // Si estamos en medio
                                                else {
                                                    paginas = [1, '...', paginaActual, '...', totalPaginas];
                                                }
                                            }

                                            return paginas.map((pagina, index) => (
                                                pagina === '...' ? (
                                                    <span key={`dots-${index}`} className="px-2 text-gray-500">...</span>
                                                ) : (
                                                    <button
                                                        key={index}
                                                        onClick={() => cambiarPagina(pagina)}
                                                        className={`w-8 h-8 rounded-full ${paginaActual === pagina
                                                            ? 'bg-[#7F88D5] text-white'
                                                            : 'text-[#7F88D5] hover:bg-[#7F88D5] hover:text-white'
                                                            }`}
                                                    >
                                                        {pagina}
                                                    </button>
                                                )
                                            ));
                                        })()}

                                        <button
                                            onClick={() => cambiarPagina(paginaActual + 1)}
                                            disabled={paginaActual === totalPaginas}
                                            className={`p-2 rounded-full ${paginaActual === totalPaginas
                                                ? 'text-gray-400 cursor-not-allowed'
                                                : 'text-[#7F88D5] hover:bg-[#7F88D5] hover:text-white'
                                                }`}
                                        >
                                            <IoIosArrowForward />
                                        </button>
                                    </div>
                                </div>

                                {isEditModalOpen === true ? (
                                    <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                                        <h2 className="text-2xl font-bold mb-2">Editar Usuario</h2>
                                        <div className="w-full h-[1px] bg-gray-300 mb-3"></div>
                                        <form
                                            className="w-[500px] flex flex-col justify-center gap-4"
                                            >
                                            
                                            <div className="relative ">
                                                <textarea
                                                    disabled={true}
                                                    id="description"
                                                    rows={4}
                                                    className="min-h-[111px] cursor-not-allowed block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-[2.5px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#a5aefc] focus:border-[2.5px] peer"
                                                    placeholder=" "
                                                    value={editPregunta?.description}
                                                    onChange={(e) => setEditPregunta({ ...editPregunta, description: e.target.value })}
                                                />
                                                <label
                                                    htmlFor="description"
                                                    className="absolute text-md text-slate-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#a5aefc]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[20%] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2">
                                                    Descripcion
                                                </label>
                                            </div>
                                            <div className="relative ">
                                                <textarea
                                                    id="description"
                                                    rows={4}
                                                    disabled={true}
                                                    className={`cursor-not-allowed min-h-[111px] block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-[2.5px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#a5aefc] focus:border-[2.5px] peer`}
                                                    placeholder=" "
                                                    value={editPregunta?.support_response || ''}
                                                    onChange={(e) => setEditPregunta({ ...editPregunta, support_response: e.target.value })}
                                                />
                                                <label
                                                    htmlFor="description"
                                                    className="absolute text-md text-slate-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#a5aefc]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[20%] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2">
                                                    Respuesta
                                                </label>
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditModalOpen(false)}
                                                    className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-md">
                                                    Salir
                                                </button>

                                            </div>
                                        </form>
                                    </Modal>
                                ) :
                                    null
                                }
                            </div>
            )
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

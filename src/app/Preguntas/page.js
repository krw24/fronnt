'use client'

import { FiSearch, FiLogOut } from "react-icons/fi";


const Preguntas = () => {
    return (
        <div className="w-full h-screen flex flex-col relative">
            <div className="w-full h-24 flex items-center justify-between px-8 font-semibold bg-indigo-200">
                <div className="w-full text-6xl  font-semibold bg-indigo-200">
                    Soporte
                </div>
                <div className=" flex items-center flex-row gap-2">
                    <div className="w-72 flex items-center gap-2 justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            logo
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="text-lg font-semibold">
                                Juanes Espinosa
                            </div>
                            <div onClick={() => {
                                localStorage.removeItem('token');
                                window.location.href = '/';
                            }} className="cursor-pointer translate-x-1 hover:translate-x-2 transition-all duration-300">
                                <FiLogOut className="text-2xl text-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[calc(100vh-88px)] flex items-center justify-center">
                <div className="w-[500px] h-[400px] p-5 bg-slate-200 rounded-xl shadow-xl ">
                    <div className="w-full flex flex-col gap-4 h-full p-4 pt-6  bg-white rounded-lg">
                        <div className="relative h-11">
                            <select
                                id="testMode"
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-[2.5px] border-gray-300  focus:outline-none focus:ring-0 focus:border-[#a5aefc] focus:border-[2.5px] peer"
                                defaultValue={''}
                            >
                                <option disabled value={''}>Seleccione una opción</option>
                                <option value="1">Peticion</option>
                                <option value="2">Queja</option>
                                <option value="3">Reclamo</option>
                            </select>
                            <label
                                htmlFor="testMode"
                                className="absolute text-md  dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#a5aefc]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                                Modo pruebas
                            </label>
                        </div>
                        <div className="relative ">
                            <textarea
                                id="description"
                                rows={4}
                                className="min-h-[111px] block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-[2.5px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#a5aefc] focus:border-[2.5px] peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="description"
                                className="absolute text-md text-slate-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#a5aefc]  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[20%] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2">
                                Descripcion
                            </label>
                        </div>
                        <div className="w-full flex justify-end">
                            <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute flex flex-col bottom-0 right-10 w-[400px] h-[550px] border-[1px] border-slate-500 rounded-t-xl">
                {/* Header del chat */}
                <div className="w-full h-[60px] flex justify-between items-center px-4 bg-slate-500 rounded-t-xl">
                    <h3 className="text-white font-medium">Chat de Ayuda</h3>
                    <button className="hover:bg-slate-400 p-1 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Área de mensajes */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    {/* Aquí irán los mensajes */}
                </div>

                {/* Input para escribir mensajes */}
                <div className="p-4 border-t bg-white">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Escribe tu mensaje..."
                            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preguntas;

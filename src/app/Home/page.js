'use client'

import { useState } from "react";
import Modal from "../../components/modal/Modal.js"
import { useRouter } from "next/navigation";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import useHome from "./useHome.js";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Toaster } from "react-hot-toast";

const Home = () => {

    const [selected, setSelected] = useState(0);

    const {
        clientes,
        formatText,
        handleAddCliente,
        isModalOpen,
        setIsModalOpen,
        newCliente,
        setNewCliente,
        handleUpdateCliente,
        handleDeleteCliente,
        handleEditCliente,
        isEditModalOpen,
        setIsEditModalOpen,
        editCliente,
        setEditCliente,
        busqueda,
        setBusqueda,
        clientesFiltrados,
        alertDelete,
        clientesActuales,
        paginaActual,
        cambiarPagina,
        totalPaginas,


        preguntas,
        handleEditPregunta,
        editPregunta,
        setEditPregunta,
        handleUpdatePregunta
    } = useHome();


    return (
        <div className="w-full h-screen  flex flex-row ">
            <div className="w-20 h-screen bg-red-500">
                <div className="w-full h-20 bg-indigo-500"></div>
                <div className="w-full h-[calc(100vh-80px)] bg-slate-200 flex flex-col">
                    <div onClick={() => setSelected(0)} className="w-full h-24 bg-indigo-600 flex justify-center items-center text-white border-b-[1.5px] border-indigo-400 cursor-pointer hover:opacity-85 duration-300 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9  ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                    </div>
                    <div onClick={() => setSelected(1)} className="w-full h-24 bg-indigo-600 flex justify-center items-center text-white border-b-[1.5px] border-indigo-400 cursor-pointer hover:opacity-85 duration-300 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9  ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                    </div>
                    <div onClick={() => setSelected(2)} className="w-full h-24 bg-indigo-600 flex justify-center items-center text-white border-b-[1.5px] border-indigo-400 cursor-pointer hover:opacity-85 duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9  ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                    </div>
                    <div onClick={() => setSelected(3)} className="w-full h-24 bg-indigo-600 flex justify-center items-center text-white border-b-[1.5px] border-indigo-400 cursor-pointer hover:opacity-85 duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9  ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                    </div>
                    <div className="w-full h-[calc(100vh-100px)] bg-indigo-600"></div>
                </div>
            </div>
            <div className="flex flex-col w-full h-full bg-indigo-600">
                <div className="w-full h-20 bg-slate-200">

                </div>
                <div className="w-full h-[calc(100vh-80px)] bg-slate-100">
                    {
                        selected === 0 &&
                        (
                            <div className="container mx-auto pt-6 flex flex-col gap-4">
                                <div className="w-full flex flex-row gap-2 items-center">
                                    <div className="w-full flex flex-row justify-between gap-2 items-center">
                                        <div className="text-2xl font-bold flex flex-row gap-2 items-center mb-2">
                                            <div>Agregar Clientes</div>
                                            <button
                                                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md"
                                                onClick={() => setIsModalOpen(true)}>
                                                <MdAdd />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-row gap-2 items-center">
                                        <FiSearch className="absolute left-2 text-2xl text-gray-500" />
                                        <input
                                            className="p-2 pl-10 pr-4 border-[1.5px] border-gray-300 rounded-2xl outline-none"
                                            type="text"
                                            placeholder="Buscar cliente..."
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
                                                <th className="py-3 px-6">Nombre</th>
                                                <th className="py-3 px-6">Direccion</th>
                                                <th className="py-3 px-6">Email</th>
                                                <th className="py-3 px-6">Rol</th>
                                                <th className="py-3 px-6">Contacto</th>
                                                <th className="py-3 px-6">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-md  font-normal">
                                            {clientesActuales.map((cliente) => (
                                                <tr
                                                    key={cliente.id}
                                                    className="border-b border-gray-200 hover:bg-gray-100"
                                                >
                                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                                        {cliente.id}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">{cliente.name}</td>
                                                    <td className="py-3 px-6 text-left">{cliente.address}</td>
                                                    <td className="py-3 px-6 text-left">{cliente.email}</td>
                                                    <td className="py-3 px-6 text-left">{cliente.rol}</td>
                                                    <td className="py-3 px-6 text-left">{cliente.contact}</td>
                                                    <td className="py-3 px-6 text-center flex justify-center gap-2">
                                                        <button
                                                            onClick={() => handleEditCliente(cliente.id)}
                                                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full">
                                                            <MdEdit />
                                                        </button>
                                                        <button
                                                            onClick={() => alertDelete(cliente.id, cliente.name)}
                                                            className="bg-red-500 text-lg hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                                                            <MdDelete />
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
                                            onSubmit={handleUpdateCliente}>
                                            <input
                                                className="p-2 border border-gray-300 rounded-md outline-none"
                                                type="text"
                                                placeholder="Nombre completo"
                                                value={editCliente.name}
                                                onChange={(e) => setEditCliente({ ...editCliente, name: e.target.value })}
                                                required
                                            />
                                            <input
                                                className="p-2 border border-gray-300 rounded-md outline-none"
                                                type="email"
                                                placeholder="Correo electrónico"
                                                value={editCliente.email}
                                                onChange={(e) => setEditCliente({ ...editCliente, email: e.target.value })}
                                                required
                                            />
                                            <input
                                                className="p-2 border border-gray-300 rounded-md outline-none"
                                                type="text"
                                                placeholder="Teléfono de contacto"
                                                value={editCliente.contact}
                                                onChange={(e) => setEditCliente({ ...editCliente, contact: e.target.value })}
                                                required
                                            />
                                            <input
                                                className="p-2 border border-gray-300 rounded-md outline-none"
                                                type="text"
                                                placeholder="Dirección"
                                                value={editCliente.address}
                                                onChange={(e) => setEditCliente({ ...editCliente, address: e.target.value })}
                                                required
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditModalOpen(false)}
                                                    className="bg-red-500 text-white font-bold py-2 px-4 rounded-md">
                                                    Cancelar
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
                                                    Guardar cambios
                                                </button>
                                            </div>
                                        </form>
                                    </Modal>
                                ) :
                                    null
                                }

                                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                                    <h2 className="text-2xl font-bold mb-2">Agregar Usuario</h2>
                                    <div className="w-full h-[1px] bg-gray-300 mb-3"></div>
                                    <form
                                        className="w-[500px] flex flex-col justify-center gap-4"
                                        onSubmit={handleAddCliente}>
                                        <input
                                            className="p-2 border border-gray-300 rounded-md outline-none"
                                            type="text"
                                            placeholder="Nombre completo"
                                            value={newCliente.name}
                                            onChange={(e) => setNewCliente({ ...newCliente, name: e.target.value })}
                                            required
                                        />
                                        <input
                                            className="p-2 border border-gray-300 rounded-md outline-none"
                                            type="email"
                                            placeholder="Correo electrónico"
                                            value={newCliente.email}
                                            onChange={(e) => setNewCliente({ ...newCliente, email: e.target.value })}
                                            required
                                        />
                                        <input
                                            className="p-2 border border-gray-300 rounded-md outline-none"
                                            type="text"
                                            placeholder="Teléfono de contacto"
                                            value={newCliente.contact}
                                            onChange={(e) => setNewCliente({ ...newCliente, contact: e.target.value })}
                                            required
                                        />
                                        <input
                                            className="p-2 border border-gray-300 rounded-md outline-none"
                                            type="text"
                                            placeholder="Dirección"
                                            value={newCliente.address}
                                            onChange={(e) => setNewCliente({ ...newCliente, address: e.target.value })}
                                            required
                                        />
                                        <input
                                            className="p-2 border border-gray-300 rounded-md outline-none"
                                            type="password"
                                            placeholder="Contraseña"
                                            value={newCliente.password}
                                            onChange={(e) => setNewCliente({ ...newCliente, password: e.target.value })}
                                            required
                                        />
                                        <select
                                            className="p-2 border border-gray-300 rounded-md outline-none"
                                            value={newCliente.rol}
                                            onChange={(e) => setNewCliente({ ...newCliente, rol: e.target.value })}
                                            required
                                        >
                                            <option value="">Seleccionar rol</option>
                                            <option value="cliente">Cliente</option>
                                            <option value="admin">Administrador</option>
                                        </select>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsModalOpen(false)}
                                                className="bg-red-500 text-white font-bold py-2 px-4 rounded-md">
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
                                                Agregar Usuario
                                            </button>
                                        </div>
                                    </form>
                                </Modal>

                            </div>
                        )
                    }
                    {
                        selected === 1 &&
                        (
                            <div className="container mx-auto pt-6 flex flex-col gap-4">
                                <div className="w-full flex flex-row gap-2 items-center">
                                    
                                    <div className="relative flex flex-row gap-2 items-center">
                                        <FiSearch className="absolute left-2 text-2xl text-gray-500" />
                                        <input
                                            className="p-2 pl-10 pr-4 border-[1.5px] border-gray-300 rounded-2xl outline-none"
                                            type="text"
                                            placeholder="Buscar Preguntas..."
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
                                                <th className="py-3 px-6">Pregunta</th>
                                                <th className="py-3 px-6">Respuesta</th>
                                                <th className="py-3 px-6">Estado</th>
                                                <th className="py-3 px-6">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-md  font-normal">
                                            {preguntas.map((pregunta) => (
                                                <tr
                                                    key={pregunta.id}
                                                    className="border-b border-gray-200 hover:bg-gray-100"
                                                >
                                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                                        {pregunta.id}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">{pregunta.user_id}</td>
                                                    <td className="py-3 px-6 text-left">{pregunta.support_name}</td>
                                                    <td className="py-3 px-6 text-left">{formatText(pregunta.description)}</td>
                                                    <td className="py-3 px-6 text-left">{formatText(pregunta.support_response)}</td>
                                                    <td className="py-3 px-6 text-left">{pregunta.status}</td>
                                                    <td className="py-3 px-6 text-center flex justify-center gap-2">
                                                        <button
                                                            onClick={() => handleEditPregunta(pregunta.id)}
                                                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full">
                                                            <MdEdit />
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
                                            onSubmit={handleUpdateCliente}>
                                            
                                            <div className="relative ">
                                                <textarea
                                                    id="description"
                                                    rows={4}
                                                    className="min-h-[111px] block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-[2.5px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#a5aefc] focus:border-[2.5px] peer"
                                                    placeholder=" "
                                                    value={editPregunta.description}
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
                                                    className="min-h-[111px] block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-[2.5px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#a5aefc] focus:border-[2.5px] peer"
                                                        placeholder=" "
                                                        value={editPregunta.support_response}
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
                                                    className="bg-red-500 text-white font-bold py-2 px-4 rounded-md">
                                                    Cancelar
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
                                                    Enviar respuesta
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
                    {
                        selected === 2 &&
                        (
                            <div className="w-full h-full bg-blue-500">
                                
                            </div>
                        )
                    }
                    {
                        selected === 3 &&
                        (
                            <div className="w-full h-full bg-green-500">
                                
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;

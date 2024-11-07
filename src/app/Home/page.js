'use client'

import { useState } from "react";
import Modal from "../../components/modal/Modal.js"
import { useRouter } from "next/navigation";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import useHome from "./useHome.js";

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
        alertDelete
      } = useHome();


    return (
        <div className="w-full h-screen  flex flex-row ">
            <div className="w-20 h-screen bg-red-500">
                <div className="w-full h-20 bg-indigo-500"></div>
                <div className="w-full h-[calc(100vh-80px)] bg-slate-200 flex flex-col">
                    <div onClick={()=>setSelected(0)} className="w-full h-24 bg-indigo-600 flex justify-center items-center text-white border-b-[1.5px] border-indigo-400 cursor-pointer hover:opacity-85 duration-300 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9  ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                    </div>
                    <div onClick={()=>setSelected(1)} className="w-full h-24 bg-indigo-600 flex justify-center items-center text-white border-b-[1.5px] border-indigo-400 cursor-pointer hover:opacity-85 duration-300 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9  ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                    </div>
                    <div className="w-full h-24 bg-indigo-600 flex justify-center items-center text-white border-b-[1.5px] border-indigo-400 cursor-pointer hover:opacity-85 duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9  ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                    </div>
                    <div className="w-full h-24 bg-indigo-600 flex justify-center items-center text-white border-b-[1.5px] border-indigo-400 cursor-pointer hover:opacity-85 duration-300">
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
                                className="bg-[#7F88D5] text-white font-bold py-2 px-4 rounded-md"
                                onClick={() => setIsModalOpen(true)}>
                                <MdAdd />
                                </button>
                            </div>
                            </div>
                            <div className="relative flex flex-row gap-2 items-center">
                            <FiSearch className="absolute left-2 text-2xl text-gray-500"/>
                            <input
                                className="p-2 pl-10 pr-4 border-[1.5px] border-gray-300 rounded-2xl outline-none"
                                type="text"
                                placeholder="Buscar cliente..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                            </div>
                        </div>
                        <div className="min-w-full overflow-y-auto h-[70vh] shadow-lg mt-2 shadow-slate-300 rounded-lg">
                            <table className="min-w-full table-auto bg-white  rounded-lg">
                            <thead>
                                <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6">ID</th>
                                <th className="py-3 px-6">Nombre</th>
                                <th className="py-3 px-6">Descripción</th>
                                <th className="py-3 px-6">Precio</th>
                                <th className="py-3 px-6">Cantidad</th>
                                <th className="py-3 px-6">Activo</th>
                                <th className="py-3 px-6">Fecha de Creación</th>
                                <th className="py-3 px-6">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-md  font-normal">
                                {clientesFiltrados.map((cliente) => (
                                <tr
                                    key={cliente.id}
                                    className="border-b border-gray-200 hover:bg-gray-100"
                                >
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {cliente.id}
                                    </td>
                                    <td className="py-3 px-6 text-left">{cliente.nombre}</td>
                                    <td className="py-3 px-6 text-left">{formatText(cliente.descripcion)}</td>
                                    <td className="py-3 px-6 text-left">{cliente.precio}</td>
                                    <td className="py-3 px-6 text-center">{cliente.cantidad}</td>
                                    <td className="py-3 px-6 text-center">
                                    {cliente.activo ? (
                                        <span className="bg-[#99A5E0] text-white py-2 px-4 rounded-full text-md">
                                        Sí
                                        </span>
                                    ) : (
                                        <span className="bg-red-200 text-red-700 py-1 px-3 rounded-full text-xs">
                                        No
                                        </span>
                                    )}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                    {new Date(cliente.fecha_creacion).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-6 text-center flex justify-center gap-2">
                                    <button
                                        onClick={() => handleEditCliente(cliente.id)}
                                        className="bg-blue-500 text-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                        <MdEdit />
                                    </button>
                                    <button
                                        onClick={() => alertDelete(cliente.id, cliente.nombre)}
                                        className="bg-red-500 text-lg hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                                        <MdDelete />
                                    </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>

                        {isEditModalOpen === true ? (
                        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                            <h2 className="text-2xl font-bold mb-2">Editar Cliente</h2>
                            <div className="w-full h-[1px] bg-gray-300 mb-3"></div>
                            <form
                            className="w-[500px]  flex flex-col justify-center gap-4 "
                            onSubmit={handleUpdateCliente}>
                            <input
                                className="p-2 border border-gray-300 rounded-md outline-none"
                                type="text"
                                placeholder="Nombre"
                                value={editCliente.nombre}  
                                onChange={(e) => setEditCliente({ ...editCliente, nombre: e.target.value })}
                                required
                            />
                            <input
                                className="p-2 border border-gray-300 rounded-md outline-none"
                                type="text"
                                placeholder="Descripción"
                                value={editCliente.descripcion} 
                                onChange={(e) => setEditCliente({ ...editCliente, descripcion: e.target.value })}
                                required
                            />
                            <input
                                className="p-2 border border-gray-300 rounded-md outline-none"
                                type="number"
                                placeholder="Precio"
                                value={editCliente.precio}  
                                onChange={(e) => setEditCliente({ ...editCliente, precio: e.target.value })}
                                required
                            />
                            <input
                                className="p-2 border border-gray-300 rounded-md outline-none"
                                type="number"
                                placeholder="Cantidad"
                                value={editCliente.cantidad}  
                                onChange={(e) => setEditCliente({ ...editCliente, cantidad: e.target.value })}
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
                                    onClick={handleUpdateCliente}
                                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
                                    Editar
                                </button>
                            </div>
                            </form>
                        </Modal>
                        ) :
                        null
                        }

                        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                            <h2 className="text-2xl font-bold mb-2">Agregar Cliente</h2>
                            <div className="w-full h-[1px] bg-gray-300 mb-3"></div>
                            <form
                            className="w-[500px]  flex flex-col justify-center gap-4 "
                            onSubmit={handleAddCliente}>
                            <input
                                className="p-2 border border-gray-300 rounded-md outline-none"
                                type="text"
                                placeholder="Nombre"
                                value={newCliente.nombre}
                                onChange={(e) => setNewCliente({ ...newCliente, nombre: e.target.value })} required
                            />
                            <input
                                className="p-2 border border-gray-300 rounded-md outline-none"
                                type="text"
                                placeholder="Descripción"
                                value={newCliente.descripcion}
                                onChange={(e) => setNewCliente({ ...newCliente, descripcion: e.target.value })}
                                required
                            />
                            <input
                                className="p-2 border border-gray-300 rounded-md outline-none"
                                type="number"
                                placeholder="Precio"
                                value={newCliente.precio}
                                onChange={(e) => setNewCliente({ ...newCliente, precio: e.target.value })}
                                required
                            />
                            <input
                                className="p-2 border border-gray-300 rounded-md outline-none "
                                type="number"
                                placeholder="Cantidad"
                                value={newCliente.cantidad}
                                onChange={(e) => setNewCliente({ ...newCliente, cantidad: e.target.value })}
                                required
                            />
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
                                Agregar
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
                            <div className="w-full h-full bg-red-500">
                                <h1>Home2</h1>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;

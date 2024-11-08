'use client'

import { useState } from "react";
import Modal from "../../components/modal/Modal.js"
import { useRouter } from "next/navigation";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import useHome from "./useHome.js";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Toaster } from "react-hot-toast";
import { ChatAdmin } from "../../components/chat/ChatAdmin.js";
import { TbMessage2Search, TbClipboardData, TbUsersGroup } from "react-icons/tb";
import { TbMessages } from "react-icons/tb";
import { SlLogout } from "react-icons/sl";

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
        handleUpdatePregunta,

        preguntasActuales,
        paginaActualPreguntas,
        cambiarPaginaPreguntas,
        totalPaginasPreguntas,
        estadoSeleccionado,
        setEstadoSeleccionado,
        statePregunta,

        facturaData,
        setFacturaData,
        nuevoItem,
        handleClienteSelect,
        handleItemChange,
        handleAgregarItem,
        handleEliminarItem,
        handleGenerarFactura,
    } = useHome();

    // console.log('facturaData', clientes)

    const SkeletonCell = () => {
        return (
            <div className="bg-gray-300 h-6 w-full rounded-full mb-4 animate-pulse"></div>
        );
    };


    return (
        <div className="w-full h-screen  flex flex-row ">
            <div className="w-20 h-screen bg-red-500">
                <div className="w-full h-20 bg-indigo-500"></div>
                <div className="w-full h-[calc(100vh-80px)] bg-slate-200 flex flex-col">
                    <div onClick={() => setSelected(0)} className="w-full h-24 bg-indigo-600 flex justify-center items-center text-white border-b-[1.5px] border-indigo-400 cursor-pointer hover:opacity-85 duration-300 ">
                        <TbUsersGroup className="text-4xl" />
                    </div>
                    <div onClick={() => setSelected(1)} className="w-full h-24 bg-indigo-600 flex justify-center items-center text-white border-b-[1.5px] border-indigo-400 cursor-pointer hover:opacity-85 duration-300 ">
                        <TbMessage2Search className="text-4xl" />
                    </div>
                    <div onClick={() => setSelected(2)} className="w-full h-24 bg-indigo-600 flex justify-center items-center text-white border-b-[1.5px] border-indigo-400 cursor-pointer hover:opacity-85 duration-300">
                        <TbMessages className="text-4xl" />
                    </div>
                    <div onClick={() => setSelected(3)} className="w-full h-24 bg-indigo-600 flex justify-center items-center text-white border-b-[1.5px] border-indigo-400 cursor-pointer hover:opacity-85 duration-300">
                        <TbClipboardData className="text-4xl" />
                    </div>
                    <div className="w-full h-[calc(100vh-100px)] bg-indigo-600"></div>
                </div>
            </div>
            <div className="flex flex-col w-full h-full bg-indigo-600">
                <div className="w-full h-20 font-semibold flex pl-8 items-center justify-between text-5xl bg-slate-200">
                    <div className="">Admin</div>
                    <button 
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/";
                          }}
                    className="flex flex-row gap-2 items-center text-2xl pr-8">  
                        <SlLogout />
                    </button>
                </div>
                <div className="w-full h-[calc(100vh-80px)] overflow-y-auto bg-slate-100">
                    {
                        selected === 0 &&
                        (
                            <div className="container mx-auto pt-6 flex flex-col gap-4">
                                <div className="w-full flex flex-row gap-2 items-center">
                                    <div className="w-full flex flex-row justify-between gap-2 items-center">
                                        <div className="text-2xl font-bold flex flex-row gap-2 items-center mb-2">
                                            <div>Agregar Usuarios</div>
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
                                    <div> 
                                        <select
                                            className="p-2 border border-gray-300 rounded-md outline-none"
                                            value={estadoSeleccionado}
                                            onChange={(e) => setEstadoSeleccionado(e.target.value)}
                                        >
                                            <option defaultValue value='0'>Ninguno</option>
                                            <option value="1">Preguntas</option>
                                            <option value="2">Quejas</option>
                                            <option value="3">Reclamos</option>
                                        </select>
                                    </div>
                                    <div className="relative flex flex-row gap-2 items-center">
                                        <FiSearch className="absolute left-2 text-2xl text-gray-500" />
                                        <input
                                            disabled={estadoSeleccionado != 0 ? true : false}
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
                                            if (totalPaginasPreguntas <= 5) {
                                                // Si hay 5 o menos páginas, mostrar todas
                                                paginas = [...Array(totalPaginasPreguntas)].map((_, i) => i + 1);
                                            } else {
                                                // Si estamos en las primeras 3 páginas
                                                if (paginaActualPreguntas <= 3) {
                                                    paginas = [1, 2, 3, '...', totalPaginasPreguntas];
                                                }
                                                // Si estamos en las últimas 3 páginas
                                                else if (paginaActualPreguntas >= totalPaginasPreguntas - 2) {
                                                    paginas = [1, '...', totalPaginasPreguntas - 2, totalPaginasPreguntas - 1, totalPaginasPreguntas];
                                                }
                                                // Si estamos en medio
                                                else {
                                                    paginas = [1, '...', paginaActualPreguntas, '...', totalPaginasPreguntas];
                                                }
                                            }

                                            return paginas.map((pagina, index) => (
                                                pagina === '...' ? (
                                                    <span key={`dots-${index}`} className="px-2 text-gray-500">...</span>
                                                ) : (
                                                    <button
                                                        key={index}
                                                        onClick={() => cambiarPaginaPreguntas(pagina)}
                                                        className={`w-8 h-8 rounded-full ${paginaActualPreguntas === pagina
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
                                            disabled={paginaActualPreguntas === totalPaginasPreguntas}
                                            className={`p-2 rounded-full ${paginaActualPreguntas === totalPaginasPreguntas
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
                                            onSubmit={handleUpdatePregunta}>
                                            
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
                                                    disabled={statePregunta != 'pendiente' ? true : false}
                                                    className={`${statePregunta != 'pendiente' ? 'cursor-not-allowed' : ''} min-h-[111px] block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-[2.5px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#a5aefc] focus:border-[2.5px] peer`}
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
                                                    className="bg-red-500 text-white font-bold py-2 px-4 rounded-md">
                                                    Cancelar
                                                </button>
                                                <button
                                                    disabled={statePregunta != 'pendiente' ? true : false}
                                                    type="submit"
                                                    className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-md ${statePregunta != 'pendiente' ? 'cursor-not-allowed' : ''}`}>
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
                                <ChatAdmin />
                            </div>
                        )
                    }
                    {
                        selected === 3 &&
                        (
                            <div className="w-full h-full flex flex-row justify-center items-center gap-5">
                                <div className="w-[700px] h-auto flex flex-col bg-white rounded-lg shadow-lg p-8">
                                    <div className="w-full flex justify-center text-3xl font-bold mb-2">Generador de facturas electrónicas</div>
                                    <div className="w-full flex justify-center text-md font-light mb-6">En este apartado podrás generar facturas electrónicas para tus clientes</div>
                                    
                                    <form onSubmit={handleGenerarFactura} className="flex flex-col gap-4">
                                        {/* Información básica de la factura */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col">
                                                <label className="text-sm text-gray-600 mb-1">Número de Factura</label>
                                                <input 
                                                    type="text" 
                                                    value={facturaData.numeroFactura}
                                                    onChange={(e) => setFacturaData(prev => ({...prev, numeroFactura: e.target.value}))}
                                                    className="p-2 border border-gray-300 rounded-md"
                                                    placeholder="Ej: 123"
                                                    required
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="text-sm text-gray-600 mb-1">Fecha</label>
                                                <input 
                                                    type="date" 
                                                    value={facturaData.fecha}
                                                    onChange={(e) => setFacturaData(prev => ({...prev, fecha: e.target.value}))}
                                                    className="p-2 border border-gray-300 rounded-md"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Información del cliente */}
                                        <div className="border-t pt-4 mt-2">
                                            <h3 className="text-lg font-semibold mb-3">Información del Cliente</h3>
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="flex flex-col">
                                                    <label className="text-sm text-gray-600 mb-1">Seleccionar Cliente</label>
                                                    <select 
                                                        value={facturaData.cliente.id}
                                                        onChange={(e) => handleClienteSelect(e.target.value)}
                                                        className="p-2 border border-gray-300 rounded-md"
                                                        required
                                                    >
                                                        <option value="">Seleccione un cliente</option>
                                                        {clientes
                                                            .filter(cliente => cliente.rol === 'cliente')
                                                            .map(cliente => (
                                                                <option key={cliente.id} value={cliente.id}>
                                                                    {cliente.name}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Items de la factura */}
                                        <div className="border-t pt-4 mt-2">
                                            <h3 className="text-lg font-semibold mb-3">Agregar Item</h3>
                                            
                                            {/* Formulario para nuevo item */}
                                            <div className="grid grid-cols-4 gap-2">
                                                <div className="flex flex-col">
                                                    <label className="text-sm text-gray-600 mb-1">Descripción</label>
                                                    <input 
                                                        type="text" 
                                                        name="descripcion"
                                                        value={nuevoItem.descripcion}
                                                        onChange={handleItemChange}
                                                        className="p-2 border border-gray-300 rounded-md"
                                                        placeholder="Producto/Servicio"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label className="text-sm text-gray-600 mb-1">Cantidad</label>
                                                    <input 
                                                        type="number" 
                                                        name="cantidad"
                                                        value={nuevoItem.cantidad === 0 ? '' : nuevoItem.cantidad}
                                                        onChange={handleItemChange}
                                                        className="p-2 border border-gray-300 rounded-md"
                                                        min="0"
                                                        placeholder="0"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label className="text-sm text-gray-600 mb-1">Precio Unit.</label>
                                                    <input 
                                                        type="number" 
                                                        name="precioUnitario"
                                                        value={nuevoItem.precioUnitario === 0 ? '' : nuevoItem.precioUnitario}
                                                        onChange={handleItemChange}
                                                        className="p-2 border border-gray-300 rounded-md"
                                                        min="0"
                                                        placeholder="0"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label className="text-sm text-gray-600 mb-1">Total</label>
                                                    <input 
                                                        type="number" 
                                                        value={nuevoItem.precio === 0 ? '' : nuevoItem.precio}
                                                        className="p-2 border border-gray-300 rounded-md bg-gray-100"
                                                        disabled
                                                        placeholder="0"
                                                    />
                                                </div>
                                            </div>
                                            <button 
                                                type="button"
                                                onClick={handleAgregarItem}
                                                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 w-fit mt-2"
                                            >
                                                + Agregar Item
                                            </button>
                                        </div>

                                        {/* Totales */}
                                        <div className="border-t pt-4 mt-2">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between">
                                                    <span className="font-semibold">Subtotal:</span>
                                                    <span>${facturaData.subtotal}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-semibold">Impuestos (19%):</span>
                                                    <span>${facturaData.impuestos}</span>
                                                </div>
                                                <div className="flex justify-between text-lg font-bold">
                                                    <span>Total:</span>
                                                    <span>${facturaData.total}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button 
                                            type="submit"
                                            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 mt-4"
                                        >
                                            Generar Factura
                                        </button>
                                    </form>
                                </div>
                                <div className="w-[400px] h-[500px] bg-white rounded-lg shadow-lg p-4 flex flex-col">
                                    <div className="w-full flex justify-center text-3xl font-bold mb-4">
                                        Productos agregados
                                    </div>
                                    
                                    {facturaData.items.length === 0 ? (
                                        <div className="text-center text-gray-500 mt-8">
                                            No hay productos agregados
                                        </div>
                                    ) : (
                                        <div className="flex-1 overflow-y-auto pr-2">
                                            <div className="flex flex-col gap-3">
                                                {facturaData.items.map((item, index) => (
                                                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="font-semibold">{item.descripcion}</span>
                                                            <button 
                                                                onClick={() => handleEliminarItem(index)}
                                                                className="text-red-500 hover:text-red-700"
                                                            >
                                                                <MdDelete className="text-xl" />
                                                            </button>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                                            <div>Cantidad: {item.cantidad}</div>
                                                            <div>Precio Unit: ${item.precioUnitario}</div>
                                                            <div className="col-span-2 text-right font-semibold text-black">
                                                                Total: ${item.precio}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <Toaster position="top-right"/>
        </div>
    )
}

export default Home;

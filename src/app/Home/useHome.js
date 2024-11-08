'use client'
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast';
import { useSearchParams } from "next/navigation";

const useHome = () => {

  const [clientes, setClientes] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
    
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [refreshDataPreguntas, setRefreshDataPreguntas] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [clientesFiltrados, setClientesFiltrados] = useState(clientes);
  const [preguntasFiltradas, setPreguntasFiltradas] = useState(preguntas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const [userLoged, setUserLoged] = useState([]);



  let preguntasPrueba = [
    {
        id: 1,
        user_id: 1,
        support_name: 'Juan Perez',
        type: 'pregunta',
        description: '¿Como puedo cancelar mi suscripción?',
        support_response: 'Para cancelar tu suscripción, por favor sigue estos pasos: 1. Ingresa a tu cuenta en nuestro sitio web. 2. Navega a la sección de ',
        status: 'contestada'
    },
    {
        id: 2,
        user_id: 1,
        support_name: 'Juan Perez',
        type: 'queja',
        description: '¿Como puedo cancelar mi suscripción?',
        support_response: 'Para cancelar tu suscripción, por favor sigue estos pasos: 1. Ingresa a tu cuenta en nuestro sitio web. 2. Navega a la sección de ',
        status: 'contestada'
    },
    {
        id: 3,
        user_id: 1,
        support_name: 'Juan Perez',
        type: 'queja',
        description: '¿Como puedo cancelar mi suscripción?',
        support_response: 'Para cancelar tu suscripción, por favor sigue estos pasos: 1. Ingresa a tu cuenta en nuestro sitio web. 2. Navega a la sección de ',
        status: 'contestada'
    },
    {
        id: 4,
        user_id: '',
        support_name: '',
        type: 'reclamo',
        description: '¿como puedo registrarme?',
        support_response: '',
        status: 'pendiente'
    },
    {
        id: 11,
        user_id: '',
        support_name: '',
        type: 'reclamo',
        description: '¿como puedo registrarme?',
        support_response: '',
        status: 'pendiente'
    },
    {
        id: 5,
        user_id: 1,
        support_name: 'Juan Perez',
        type: 'reclamo',
        description: '¿Como puedo cancelar mi suscripción?',
        support_response: 'Para cancelar tu suscripción, por favor sigue estos pasos: 1. Ingresa a tu cuenta en nuestro sitio web. 2. Navega a la sección de ',
        status: 'contestada'
    },
    {
        id: 6,
        user_id: 1,
        support_name: 'Juan Perez',
        type: 'pregunta',
        description: '¿Como puedo cancelar mi suscripción?',
        support_response: 'Para cancelar tu suscripción, por favor sigue estos pasos: 1. Ingresa a tu cuenta en nuestro sitio web. 2. Navega a la sección de ',
        status: 'contestada'
    },
    {
        id: 7,
        user_id: 1,
        support_name: 'Juan Perez',
        type: 'reclamo',
        description: '¿Como puedo cancelar mi suscripción?',
        support_response: 'Para cancelar tu suscripción, por favor sigue estos pasos: 1. Ingresa a tu cuenta en nuestro sitio web. 2. Navega a la sección de ',
        status: 'contestada'
    },
    {
        id: 8,
        user_id: '',
        support_name: '',
        type: 'queja',
        description: '¿como puedo registrarme?',
        support_response: '',
        status: 'pendiente'
    },
    {
        id: 9,
        user_id: 1,
        support_name: 'Juan Perez',
        type: 'pregunta',
        description: '¿Como puedo cancelar mi suscripción?',
        support_response: 'Para cancelar tu suscripción, por favor sigue estos pasos: 1. Ingresa a tu cuenta en nuestro sitio web. 2. Navega a la sección de ',
        status: 'contestada'
    },
    {
        id: 10,
        user_id: 1,
        support_name: 'Juan Perez',
        type: 'reclamo',
        description: '¿Como puedo cancelar mi suscripción?',
        support_response: 'Para cancelar tu suscripción, por favor sigue estos pasos: 1. Ingresa a tu cuenta en nuestro sitio web. 2. Navega a la sección de ',
        status: 'contestada'
    }
];

  const [editCliente, setEditCliente] = useState({
    id: '',
    name: '',
    address: '',
    contact: '',
    email: '',  
    password: '',
    role: ''
  }); 

  const [editPregunta, setEditPregunta] = useState({
    id: '',
    user_id: '',
    support_name: '',
    description: '',
    support_response: '',
    status: ''
  });
  
  const [newCliente, setNewCliente] = useState({
    name: '',
    address: '',
    contact: '',
    email: '',
    password: '',
    role: ''
  });

    useEffect(() => {
        getDataInit();
        getUserLoged();
    }, []);
  
    useEffect(() => {
      getDataInit();
    }, [refreshData]);
  
    useEffect(() => {
      getDataPreguntas();
    }, []);
  
    useEffect(() => {
      getDataPreguntas();
    }, [refreshDataPreguntas]);
  

    useEffect(() => {
      console.log('userLoged', userLoged)
    }, [userLoged])
  

  useEffect(() => {
    const resultados = clientes.filter(cliente =>
      cliente.name?.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.email?.toLowerCase().includes(busqueda.toLowerCase())
    );
    setClientesFiltrados(resultados);
  }, [busqueda, clientes]);

  useEffect(() => {
    const resultados = preguntas.filter(pregunta =>
      pregunta.description?.toLowerCase().includes(busqueda.toLowerCase()) ||
      pregunta.support_name?.toLowerCase().includes(busqueda.toLowerCase())
    );
    setPreguntasFiltradas(resultados);
  }, [busqueda, preguntas]);

  useEffect(()=>{
    console.log('clientesFiltrados', clientesFiltrados)
  },[clientesFiltrados])

  const getUserLoged = async () => {
    const id = searchParams.get('id');
    console.log('id', id)
    try {
        const response = await fetch('http://localhost:3001/usuarios');
        
        if (!response.ok) {
            throw new Error('Error al obtener usuarios');
        }

        const usuarios = await response.json();

        const usuarioEncontrado = usuarios.find(user => user.id === Number(id));
        
        if (!usuarioEncontrado) {
            throw new Error('Usuario no encontrado');
        }

        setUserLoged(usuarioEncontrado);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        toast.error('Error al obtener información del usuario');
        setUserLoged({});
    }
  }

  const getDataInit = async () => {
    try {
      const response = await fetch('http://localhost:3001/usuarios');

      // Verifica si la respuesta es correcta
      if (!response.ok) {
        throw new Error('Error al obtener clientes: ' + response.statusText); // Manejo de errores si la respuesta no es correcta
      }

      const result = await response.json(); // Obtener el resultado en formato JSON
        orderClientesById(result);
      console.log('Datos obtenidos:', result); // Imprimir los datos obtenidos
      return result; // Retornar la información de clientes
    } catch (error) {
      console.error('Error:', error.message); // Loguear el error
      throw new Error('Error en la solicitud: ' + error.message); // Manejo de errores
    }
  };

  const getDataPreguntas = async () => {
    try {
      const response = await fetch('http://localhost:3001/pqr');
      if (!response.ok) {
        throw new Error('Error al obtener preguntas: ' + response.statusText);
      }
      const result = await response.json();
      orderPreguntasById(result);
      console.log('preguntas', result)
      return result;
    } catch (error) {
      console.error('Error:', error.message); // Loguear el error
      throw new Error('Error en la solicitud: ' + error.message); // Manejo de errores
    }
  }

  
  const handleUpdateCliente = async (e) => {
    e.preventDefault();
    const updatedCliente = {
      id: editCliente.id,
      name: editCliente.name,
      address: editCliente.address,
      contact: editCliente.contact,
      email: editCliente.email,
      password: editCliente.password, 
      role: editCliente.role
    };
    try {
      const response = await fetch(`http://localhost:3001/usuarios/${editCliente.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCliente)  
      });
      if (response.ok) {
        setIsEditModalOpen(false);
        toast.success('Usuario actualizado correctamente');
        setEditCliente({
          id: '',
          name: '',
          address: '',
          contact: '',
          email: '',
          password: '',
          role: ''
        });
        alertUpdate();
        setRefreshData(!refreshData);
        // setBusqueda('');
      } else {
        alertError();
        toast.error(error.message,'Error al actualizar cliente');
      }
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
    } 
  }

  const handleDeleteCliente = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {  
        setRefreshData(!refreshData);
      } else {
        console.error('Error al eliminar el cliente');
      }
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  } 

  
  const handleEditCliente = (id) => {
    setIsEditModalOpen(true);
    const cliente = clientes.find(cliente => cliente.id === id);
    setEditCliente(cliente);
  } 



  const orderClientesById = (clientes) => {
    const clientesOrder = clientes.sort((a, b) => a.id - b.id);
    setClientes(clientesOrder);
  }

  const orderPreguntasById = (preguntas) => {
    const preguntasOrder = preguntas.sort((a, b) => a.id - b.id);
    setPreguntas(preguntasOrder);
  }

  const handleAddCliente = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCliente)
      });

      if (!response.ok) {
        alertError();
        toast.error(error.message,'Error al agregar cliente');
        throw new Error('Error al agregar cliente: ' + response.statusText);
      }

      alertCreate();
      setRefreshData(!refreshData);
      const result = await response.json();
      setClientes([...clientes, result]);
      toast.success('Usuario agregado correctamente');
      setNewCliente({ name: '', address: '', contact: '', email: '', password: '', role: '' }); 
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  };  

  const handleUpdatePregunta = async (e) => {
    e.preventDefault();
    const updatedPregunta = {
      id: editPregunta.id,
      user_id: editPregunta.user_id,
      support_name: editPregunta.support_name,
      description: editPregunta.description,
      support_response: editPregunta.support_response,
      status: editPregunta.status
    };
    try {
      const response = await fetch(`http://localhost:3001/preguntas/${editPregunta.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPregunta)
      });
    } catch (error) {
      console.error('Error al actualizar la pregunta:', error);
    }
  }



  const handleEditPregunta = (id) => {
    setIsEditModalOpen(true);
    const pregunta = preguntas.find(pregunta => pregunta.id === id);
    setEditPregunta(pregunta);
  } 

    
 const formatText = (text) => {
      if (text == null) {
        return text;
      }
      if (text.length > 30) {
        return text.slice(0, 30) + '...';
      }
      return text;
  };

  /* ---------- alertas----------- */

  // alerta de eliminación  
  const alertDelete = (id, name) => {
    Swal.fire({
    title: "¿Estás seguro? ",
    text: "Esta acción es irreversible. ¿Quieres continuar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
          handleDeleteCliente(id)
          Swal.fire({
              title: "Eliminado!",
              text: `El cliente ${name} ha sido eliminado.`,
              icon: "success"
          });
      }
    });
  }

  // alerta de creacion de cliente
  const alertCreate = () => {
    Swal.fire({
      title: "Cliente creado",
      text: "El cliente ha sido creado correctamente",
      icon: "success"
    });
  } 

  // alerta de actualización de cliente
  const alertUpdate = () => {
    Swal.fire({
      title: "Cliente actualizado",
      text: "El cliente ha sido actualizado correctamente",
      icon: "success"
    });
  }

  // alerta de error
  const alertError = () => {
    Swal.fire({
      title: "Error",
      text: "Hubo un error al actualizar el cliente",
      icon: "warning"
    });
  }


   // paginador
  // ... otros estados ...
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10; // Ajusta este número según necesites

  // Calcular productos para la página actual
  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const clientesActuales = clientesFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(clientesFiltrados.length / productosPorPagina);


  const [paginaActualPreguntas, setPaginaActualPreguntas] = useState(1);
  const preguntasPorPagina = 8; // Ajusta este número según necesites

  // Calcular productos para la página actual
  const indiceUltimoPreguntas = paginaActualPreguntas * preguntasPorPagina;
  const indicePrimeroPreguntas = indiceUltimoPreguntas - preguntasPorPagina;
  const preguntasActuales = preguntasFiltradas.slice(indicePrimeroPreguntas, indiceUltimoPreguntas);
  const totalPaginasPreguntas = Math.ceil(preguntasFiltradas.length / preguntasPorPagina);

  const cambiarPaginaPreguntas = (numeroPagina) => {
    setPaginaActualPreguntas(numeroPagina);
  };


  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };





    return {
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


      // preguntas
      preguntasPrueba,
      preguntas,
      handleEditPregunta,
      editPregunta,
      setEditPregunta,
      handleUpdatePregunta,

      preguntasActuales,
      paginaActualPreguntas,
      cambiarPaginaPreguntas,
      totalPaginasPreguntas,
    }
}

export default useHome;
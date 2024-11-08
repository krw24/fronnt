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
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
  const [statePregunta, setStatePregunta] = useState('');

  // Nuevos estados para la facturación
  const [facturaData, setFacturaData] = useState({
    numeroFactura: '',
    fecha: new Date().toISOString().split('T')[0],
    cliente: {
      id: '',
      nombre: '',
      direccion: '',
      telefono: ''
    },
    items: [],
    subtotal: 0,
    impuestos: 0,
    total: 0
  });

  const [nuevoItem, setNuevoItem] = useState({
    descripcion: '',
    cantidad: 0,
    precioUnitario: 0,
    total: 0
  });

  
  useEffect(() => {
    if(estadoSeleccionado == 0){
      setBusqueda('')
    }
    if(estadoSeleccionado == '1'){
      setBusqueda('preguntas')
    }
    if(estadoSeleccionado == '2'){
      setBusqueda('quejas')
    }
    if(estadoSeleccionado == '3'){
      setBusqueda('reclamos')
    }
  }, [estadoSeleccionado])



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
    status: '',
    support_response: '',
    support_id: '',
    support_name: ''
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
      pregunta.support_name?.toLowerCase().includes(busqueda.toLowerCase()) ||
      pregunta.type?.toLowerCase().includes(busqueda.toLowerCase())
    );
    setPreguntasFiltradas(resultados);
  }, [busqueda, preguntas]);

  useEffect(()=>{
    console.log('clientesFiltrados', clientesFiltrados)
  },[clientesFiltrados])

  const sendFactura = async (factura) => {
    console.log('factura', factura)
  }

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

    console.log('editPregunta', editPregunta)
    console.log('userLoged', userLoged)
    const updatedPregunta = {
      id: editPregunta.id,
      status: 'respondida',
      support_response: editPregunta.support_response,
      support_id: userLoged.id,
      support_name: userLoged.name,
    };
    try {
      const response = await fetch(`http://localhost:3001/pqr`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPregunta)
      });
      if (response.ok) {
        setIsEditModalOpen(false);
        alertUpdatePregunta();
        setRefreshDataPreguntas(!refreshDataPreguntas);
      } else {
        alertErrorPregunta();
      }
    } catch (error) {
      console.error('Error al actualizar la pregunta:', error);
    }
  }



  const handleEditPregunta = (id) => {
    setEditPregunta({ ...editPregunta, id: id })
    setIsEditModalOpen(true);
    const pregunta = preguntas.find(pregunta => pregunta.id === id);
    setStatePregunta(pregunta.status);
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

  /* ---------- alertas usuarios----------- */

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

  /* ---------- alertas preguntas----------- */


  // alerta de actualización de cliente
  const alertUpdatePregunta = () => {
    Swal.fire({
      title: "Pregunta Respondida",
      text: "La pregunta ha sido respondida correctamente",
      icon: "success"
    });
  }

  // alerta de error
  const alertErrorPregunta = () => {
    Swal.fire({
      title: "Error",
      text: "Hubo un error al responder la pregunta",
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

  // Manejador para cuando se selecciona un cliente
  const handleClienteSelect = (clienteId) => {
    const clienteSeleccionado = clientes.find(c => c.id === Number(clienteId));
    if (clienteSeleccionado) {
      setFacturaData(prev => ({
        ...prev,
        cliente: {
          id: clienteSeleccionado.id,
          nombre: clienteSeleccionado.name,
          direccion: clienteSeleccionado.address,
          telefono: clienteSeleccionado.contact
        }
      }));
    }
  };

  // Manejador para los campos del nuevo item
  const handleItemChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'descripcion' ? value : Number(value);
    
    setNuevoItem(prev => {
      const updated = { ...prev, [name]: newValue };
      
      // Calcular precio total del item
      if (name === 'cantidad' || name === 'precioUnitario') {
        updated.precio = updated.cantidad * updated.precioUnitario;
      }
      
      return updated;
    });
  };

  // Agregar nuevo item a la factura
  const handleAgregarItem = () => {
    if (!nuevoItem.descripcion || nuevoItem.cantidad <= 0 || nuevoItem.precioUnitario <= 0) {
      toast.error('Por favor complete todos los campos del item correctamente');
      return;
    }

    setFacturaData(prev => {
      const updatedItems = [...prev.items, nuevoItem];
      const subtotal = updatedItems.reduce((sum, item) => sum + item.precio, 0);
      const impuestos = subtotal * 0.19; // 19% de impuestos
      
      return {
        ...prev,
        items: updatedItems,
        subtotal: subtotal,
        impuestos: impuestos,
        total: subtotal + impuestos
      };
    });

    // Limpiar el formulario de nuevo item
    setNuevoItem({
      descripcion: '',
      cantidad: 0,
      precioUnitario: 0,
      precio: 0
    });
  };

  // Eliminar item de la factura
  const handleEliminarItem = (index) => {
    setFacturaData(prev => {
      const updatedItems = prev.items.filter((_, i) => i !== index);
      const subtotal = updatedItems.reduce((sum, item) => sum + item.precio, 0);
      const impuestos = subtotal * 0.19;

      return {
        ...prev,
        items: updatedItems,
        subtotal: subtotal,
        impuestos: impuestos,
        total: subtotal + impuestos
      };
    });
  };

  // Generar factura
  const handleGenerarFactura = async (e) => {
    e.preventDefault();

    console.log('facturaData', facturaData)
    return;
    if (!facturaData.cliente.id || facturaData.items.length === 0) {
      toast.error('Por favor seleccione un cliente y agregue al menos un item');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/facturas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(facturaData)
      });

      if (!response.ok) {
        throw new Error('Error al generar la factura');
      }

      toast.success('Factura generada exitosamente');
      
      // Limpiar el formulario
      setFacturaData({
        numeroFactura: '',
        fecha: new Date().toISOString().split('T')[0],
        cliente: {
          id: '',
          nombre: '',
          direccion: '',
          telefono: ''
        },
        items: [],
        subtotal: 0,
        impuestos: 0,
        total: 0
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al generar la factura');
    }
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

      // Nuevos returns para la facturación
      facturaData,
      setFacturaData,
      nuevoItem,
      handleClienteSelect,
      handleItemChange,
      handleAgregarItem,
      handleEliminarItem,
      handleGenerarFactura,
    }
}

export default useHome;
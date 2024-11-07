'use client'
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const useHome = () => {

  const [clientes, setClientes] = useState([]);
    
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [clientesFiltrados, setClientesFiltrados] = useState(clientes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editCliente, setEditCliente] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    precio: '',
    cantidad: ''
  }); 
  
  const [newCliente, setNewCliente] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    cantidad: ''
  });

    useEffect(() => {
        getDataInit();
    }, []);
  
    useEffect(() => {
      getDataInit();
    }, [refreshData]);
  

  useEffect(() => {
    const resultados = clientes.filter(cliente =>
      cliente.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
    );
    setClientesFiltrados(resultados);
  }, [busqueda, clientes]);


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

  const orderClientesById = (clientes) => {
    const clientesOrder = clientes.sort((a, b) => a.id - b.id);
    setClientes(clientesOrder);
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
        throw new Error('Error al agregar cliente: ' + response.statusText);
      }

      alertCreate();
      setRefreshData(!refreshData);
      const result = await response.json();
      setClientes([...clientes, result]);
      setNewCliente({ nombre: '', descripcion: '', precio: '', cantidad: '' }); 
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  };  


  const handleUpdateCliente = async (e) => {
    e.preventDefault();
    const updatedCliente = {
      id: editCliente.id,
      nombre: editCliente.nombre,
      descripcion: editCliente.descripcion,
      precio: editCliente.precio, 
      cantidad: editCliente.cantidad
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
        setEditCliente({
          id: '',
          nombre: '',
          descripcion: '',
          precio: '', 
          cantidad: ''
        });
        alertUpdate();
        setRefreshData(!refreshData);
        // setBusqueda('');
      } else {
        alertError();
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
        console.log('Cliente eliminado correctamente');
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
  const alertDelete = (id, nombre) => {
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
              text: `El cliente (${nombre}) ha sido eliminado.`,
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
      alertDelete
    }
}

export default useHome;
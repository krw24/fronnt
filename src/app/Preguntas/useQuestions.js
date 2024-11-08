import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useQuestions = (props) => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const { register, handleSubmit, setValue } = useForm();
    const [userLoged, setUserLoged] = useState([])
    const [chatIsOpen, setChatIsOpen] = useState(false)
    const [questions, setQuestions] = useState([])

    const [preguntas, setPreguntas] = useState([]);
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [preguntasFiltradas, setPreguntasFiltradas] = useState(preguntas);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statePregunta, setStatePregunta] = useState('');
    
    const [editPregunta, setEditPregunta] = useState({
      
    }); 


    
    useEffect(() => {
        getDataInit();
    }, []);
  
    useEffect(() => {
            getDataInit();
    }, [props?.view]);
  

    useEffect(() => {
        getUserLoged()
    }, [])

    useEffect(() => {
        console.log('userLoged', userLoged)
    }, [userLoged])

    useEffect(() => {
        const resultados = preguntas.filter(pregunta =>
          pregunta.type?.toLowerCase().includes(busqueda.toLowerCase()) ||
          pregunta.support_name?.toLowerCase().includes(busqueda.toLowerCase())
        );
        setPreguntasFiltradas(resultados);
      }, [busqueda, preguntas]);
    

    const onSubmit = async (data) => {

        if (!data.type || data.type.trim() === '') {
            toast.error('El tipo de PQR es requerido');
            return;
        }
    
        if (!data.description || data.description.trim() === '') {
            toast.error('La descripción de la PQR es requerida');
            return;
        }
    
        if (data.description.length < 15) {
            toast.error('La descripción de la PQR debe tener mas de 15 caracteres');
            return;
        }

        try {
            const pqrData = {
                user_id: userLoged.id,
                support_id: '',
                type: data.type,
                description: data.description,
                support_document: null,
                support_response: null,
                status: 'pendiente'
            }

            const response = await fetch('http://localhost:3001/pqr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pqrData)
            });

            if (!response.ok) {
                throw new Error('Error al enviar la PQR');
            }

            const result = await response.json();
            setValue('type', '')
            setValue('description', '')
            toast.success('PQR enviada correctamente, se responderá pronto');
        } catch (error) {
            console.log('Error:', error);
            toast.error('Error al enviar la PQR');
        }

    }


    const getUserLoged = async () => {
        const id = searchParams.get('id');
        if (id) {
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
    }


    const getDataInit = async () => {
        if (userLoged.id) {
            let id = userLoged.id;
            try {
                const response = await fetch(`http://localhost:3001/pqr/user/${id}`);
    
          // Verifica si la respuesta es correcta
            if (!response.ok) {
                throw new Error('Error al obtener preguntas: ' + response.statusText); // Manejo de errores si la respuesta no es correcta
            }
    
            const result = await response.json(); // Obtener el resultado en formato JSON
                orderPreguntasById(result);
                console.log('Datos obtenidos:', result); // Imprimir los datos obtenidos
                return result; // Retornar la información de preguntas
            } catch (error) {
                console.error('Error:', error.message); // Loguear el error
                throw new Error('Error en la solicitud: ' + error.message); // Manejo de errores
            }
        }
    };


      const orderPreguntasById = (preguntas) => {
        const preguntasOrder = preguntas.sort((a, b) => a.id - b.id);
        setPreguntas(preguntasOrder);
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
  
    // paginador
    // ... otros estados ...
    const [paginaActual, setPaginaActual] = useState(1);
    const preguntasPorPagina = 8; // Ajusta este número según necesites
  
    // Calcular productos para la página actual
    const indiceUltimo = paginaActual * preguntasPorPagina;
    const indicePrimero = indiceUltimo - preguntasPorPagina;
    const preguntasActuales = preguntasFiltradas.slice(indicePrimero, indiceUltimo);
    const totalPaginas = Math.ceil(preguntasFiltradas.length / preguntasPorPagina);
  
    const cambiarPagina = (numeroPagina) => {
      setPaginaActual(numeroPagina);
    };
  



    return {
        userLoged,
        chatIsOpen,
        setChatIsOpen,
        register,
        handleSubmit,
        onSubmit,




        preguntas,
        formatText,
        isModalOpen,
        setIsModalOpen,
        handleEditPregunta,
        isEditModalOpen,
        setIsEditModalOpen,
        editPregunta,
        setEditPregunta,
        busqueda,
        setBusqueda,
        preguntasFiltradas,
        preguntasActuales,
        paginaActual,
        cambiarPagina,
        totalPaginas

    }   
}

export default useQuestions;
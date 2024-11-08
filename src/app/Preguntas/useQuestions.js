import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useQuestions = () => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const { register, handleSubmit, setValue } = useForm();
    const [userLoged, setUserLoged] = useState([])
    const [chatIsOpen, setChatIsOpen] = useState(false)
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        getUserLoged()
    }, [])

    useEffect(() => {
        console.log('userLoged', userLoged)
    }, [userLoged])

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

    return {
        userLoged,
        chatIsOpen,
        setChatIsOpen,
        register,
        handleSubmit,
        onSubmit
    }   
}

export default useQuestions;
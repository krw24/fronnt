import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function useQuestions() {

    const searchParams = useSearchParams();
    const [userLoged, setUserLoged] = useState([])
    const [chatIsOpen, setChatIsOpen] = useState(false)
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        getUserLoged()
    }, [])

    useEffect(() => {
        console.log('userLoged', userLoged)
    }, [userLoged])

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

    return {
        userLoged,
        chatIsOpen,
        setChatIsOpen
    }
}
'use client'
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

const usePage = () => {
    const router = useRouter()
    const { register, handleSubmit } = useForm()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [users, setUsers] = useState([])
    const [userLoged, setUserLoged] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        // console.log(users)
    }, [users])

    const getUsers = async () => {
        try {
            const response = await fetch('http://localhost:3001/usuarios', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            toast.error('Error al cargar los usuarios');
        }
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const onSubmit = (data) => {
        const { email, password } = data
        const loadingToast = toast.loading('Verificando usuario...');
        const user = users.find(user => user.email === email && user.password === password)
        if (user) {
            toast.success('Bienvenido ' + user.name, {
                id: loadingToast
            });
            setTimeout(() => {
                if (user.rol === 'admin') {
                    router.push(`/Home?id=${user.id}`);
                } else if (user.rol === 'cliente') {
                    router.push(`/Preguntas?id=${user.id}`);
                } else if (user.rol === 'tecnico') {
                    router.push(`/Tecnico?id=${user.id}`)
                }
            }, 1000);
        } else {
            toast.dismiss(loadingToast)
            toast.error('Usuario no encontrado')
        }
    }

    return {
        isPasswordVisible,
        togglePasswordVisibility,
        register,
        handleSubmit,
        onSubmit
    };
}

export default usePage;
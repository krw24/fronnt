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
        console.log(users)
    }, [users])

    const getUsers = async () => {
        const response = await fetch('http://localhost:3001/usuarios')
        console.log(response)
        const data = await response.json()
        setUsers(data)
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
                }
            }, 2000);
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
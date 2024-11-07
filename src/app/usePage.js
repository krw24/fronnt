'use client'
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"

const usePage = () => {
    const { register, handleSubmit } = useForm()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [users, setUsers] = useState([])

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

        const user = users.find(user => user.email === email && user.password === password)
        if (user) {
            console.log('Usuario encontrado:', user)
        } else {
            console.log('Usuario no encontrado')
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
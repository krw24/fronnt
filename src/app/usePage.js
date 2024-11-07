'use client'
import { useState } from 'react';
import { useForm } from "react-hook-form"

const usePage = () => {
    const { register, handleSubmit } = useForm()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const onSubmit = (data) => {
        console.log(data);
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
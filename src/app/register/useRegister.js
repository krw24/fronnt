import { useForm } from "react-hook-form";
import { useState } from "react";   
import { useRouter } from "next/navigation";

const useRegister = () => {
    const router = useRouter()
    const { register, handleSubmit, setValue } = useForm();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const onSubmit = async (data) => {
        try {
            const userData = {
                ...data,
                rol: 'cliente'
            };
            const response = await fetch('http://localhost:3001/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Error al crear el usuario');
            }
            const usuarioCreado = await response.json();
            console.log('Usuario creado exitosamente:', usuarioCreado);
            router.push('/')
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return {
        register,
        handleSubmit,
        isPasswordVisible,
        togglePasswordVisibility,
        onSubmit
    }
}

export default useRegister;
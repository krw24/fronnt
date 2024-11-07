import { useForm } from "react-hook-form";
import { useState } from "react";   
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

const useRegister = () => {
    const router = useRouter()
    const { register, handleSubmit, setValue } = useForm();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const onSubmit = async (data) => {
        const loadingToast = toast.loading('Creando usuario...');
        
        try {
            const emailCheckResponse = await fetch(`http://localhost:3001/usuarios?email=${data.email}`);
            const existingUsers = await emailCheckResponse.json();
            
            if (existingUsers.length > 0) {
                setValue('email', '');
                toast.error('Ya existe un usuario con este correo electrónico', {
                    id: loadingToast
                });
                return;
            }

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
            toast.success('Usuario creado exitosamente', {
                id: loadingToast
            });
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error) {
            toast.error('Error al crear el usuario: ' + error.message, {
                id: loadingToast
            });
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
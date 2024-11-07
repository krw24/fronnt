import { useForm } from "react-hook-form";
import { useState } from "react";   

const useRegister = () => {
    const { register, handleSubmit } = useForm();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return {
        register,
        handleSubmit,
        isPasswordVisible,
        togglePasswordVisibility
    }
}

export default useRegister;
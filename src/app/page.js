'use client'
import Link from "next/link";
import usePage from "./usePage";
import { Toaster } from 'react-hot-toast';

export default function Home() {
  const { isPasswordVisible, togglePasswordVisibility, register, handleSubmit, onSubmit } = usePage();

  return (
    <div className="w-full h-screen bg-slate-50 flex justify-center items-center">
      <div className="w-[400px] bg-white flex flex-col rounded-xl py-12 px-3 gap-4 shadow-lg">
        <div className="w-full flex justify-center text-4xl font-semibold pb-3">Inicio de sesión</div>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input 
            type="email"
            placeholder="Email"
            className="w-full h-11 outline-none rounded-md border-b-[1px] px-3"    
            {...register("email")}
          />
          <div className="relative">
            <input 
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full h-11 outline-none rounded-md border-b-[1px] px-3"    
              {...register("password")}
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className="size-6 absolute right-2 top-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM2.458 12C3.732 7.943 7.523 4.5 12 4.5c4.477 0 8.268 3.443 9.542 7.5-1.274 4.057-5.065 7.5-9.542 7.5-4.477 0-8.268-3.443-9.542-7.5z" />
              )}
            </svg>
          </div>
          <div className="w-full flex justify-center">
            <button type="submit" className="w-full py-1 bg-indigo-400 hover:bg-indigo-500 text-white text-lg rounded-lg cursor-pointer">
              Ingresar
            </button>
          </div>
        </form>
        <div className="w-full flex flex-col pt-3 gap-3">
          <div className="w-full flex justify-center font-semibold">¿No estas registrado?</div>
          <div className="w-full flex justify-center px-2 font-medium">
            <Link href="/register" className="bg-indigo-400 hover:bg-indigo-500 text-white px-3 py-1 rounded-lg cursor-pointer">
              registrarse
            </Link>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
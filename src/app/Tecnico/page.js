'use client'

import { SlLogout } from "react-icons/sl";
import { useRouter } from "next/navigation";
import { LuMessageSquarePlus } from "react-icons/lu";
import { useState } from "react";

const Tecnico = () => {

    const router = useRouter();
    const [view, setView] = useState(0);


    return (
        <div className="flex flex-row w-full h-screen">
            <div className="w-24 h-screen bg-red-500">
                <div className="w-full h-20 flex justify-center items-center bg-indigo-300"></div>
                <div onClick={() => setView(0)} className="w-full h-24 flex justify-center items-center border-b-[1px] border-indigo-100 hover:opacity-60 cursor-pointer">
                    <LuMessageSquarePlus className="text-5xl text-indigo-100" />
                </div>
                <div onClick={() => setView(1)} className="w-full h-20 flex justify-center items-center border-b-[1px] border-indigo-100 hover:opacity-60 cursor-pointer">
                    l
                </div>
                <div className="w-full h-24 flex justify-center items-center "></div>
                <div className="w-full h-24 flex justify-center items-center "></div>
            </div>
            <div className="w-full h-screen flex flex-col bg-blue-500">
                <div className="w-full h-24 font-semibold flex pl-8 items-center justify-between text-5xl bg-slate-200">
                    <div className="">Tecnico</div>
                    <button
                        onClick={() => {
                            router.push("/");
                        }}
                        className="flex flex-row gap-2 items-center text-2xl pr-8">
                        <SlLogout />
                    </button>
                </div>
                <div className="w-full h-full bg-yellow-500"></div>
            </div>
        </div>
    )
}

export default Tecnico;

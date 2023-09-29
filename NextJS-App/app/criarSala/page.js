'use client'

import React, { useState } from 'react';
import { useRouter } from "next/navigation";


export default function criarSala() {

    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('ok')

        if (!name) {
            setError("Preencha todos os campos");
            return;
        }

        try {

            const res = await fetch("api/registrarSala", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name
                }),
            })
            
            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/mainPage");
            } else {
                console.log("Registro da sala falhou.");
            }

        } catch (error) {
            console.log('error during registraion')
        }
        router.refresh()
    }

    return (
        <>
            <section className="bg-indigo-700 text-center">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-indigo-800 dark:border-indigo-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-indigo-700 md:text-2xl dark:text-white">
                                Criar Sala
                            </h1>
                            <form onSubmit={handleSubmit} className=" space-y-4 md:space-y-6" action="#">
                                <div className='text-left'>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-indigo-700 dark:text-white">Nome da Sala</label>
                                    <input onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="bg-indigo-50 border border-indigo-300 text-indigo-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sala dos Engenheiros" required="" />
                                </div>

                                {error && (
                                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                        {error}
                                    </div>
                                )}

                                <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Criar Sala</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
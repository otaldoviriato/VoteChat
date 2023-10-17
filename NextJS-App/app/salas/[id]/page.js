import React from 'react'
import SocketComponent from "../../components/socketComponent/socketComponent"
import Link from 'next/link'
import Salas from "../../../models/salas"
import User from "../../../models/user"
import { connectMongoDB } from '../../../lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'

export default async function Sala({ params }) {
    const session = await getServerSession(authOptions)

    async function getSalaData() {
        try {
            await connectMongoDB()
            const SalaData = await Salas.findById(params.id).exec()
            return SalaData
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const data = await getSalaData()

    const someFunction = (myArray) => {
        const promises = data.mensagens.map(async (myValue) => {
            const user = await User.findById(myValue.remetente).exec()
            return {
                id: user._id,
                name: user.name,
                path: user.fotoPerfil,
                data: myValue.conteudo
            }
        });
        return Promise.all(promises);
    }

    const dataM = await someFunction()

    const socketComponentProps = {
        user: {
            id: session?.user?.id,
            name: session?.user?.name,
            fotoPerfil: session?.user?.image,
        },
        sala: {
            id: data.id
        },
        dataMessages: JSON.parse(JSON.stringify(dataM))
    }

    return (
        <>
            <section className="bg-indigo-700 text-center">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-indigo-800 dark:border-indigo-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
                            <div>
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-indigo-700 md:text-2xl dark:text-white">
                                    {data.name}
                                </h1>
                                <button className='absolute top-0 right-0'>&#10010;</button>
                            </div>
                            <SocketComponent {...socketComponentProps} />
                            <Link href={"/pendentes" + '/' + data._id}  type="submit" className="w-100px text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Ver Pendentes</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
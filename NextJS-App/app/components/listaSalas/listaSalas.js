import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import Salas from '../../../models/salas'
import { connectMongoDB } from '../../../lib/mongodb'
import Link from 'next/link'

async function getSalas() {
    const session = await getServerSession(authOptions)
    const id = session?.user?.id
    try {
        await connectMongoDB()
        const salasUsuario = await Salas.find({ 'members.id_user': id }).exec()
        return salasUsuario
    } catch (error) {
        console.log(error)
        return error
    }
}

export default async function listaSalas() {
    const data = await getSalas()
    return (
        <div>
            {
                data.map((item) => {
                    return (
                        <Link href={"/salas/" + item._id } type="submit" className="w-100px text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            {item.name}
                        </Link>
                    )
                })
            }
        </div>
    )
}
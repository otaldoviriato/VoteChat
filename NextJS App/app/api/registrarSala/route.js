import { getServerSession } from "next-auth"
import { connectMongoDB } from "../../../lib/mongodb"
import Salas from "../../../models/salas"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"

export async function POST(req) {
    const session = await getServerSession(authOptions)
    const id = session?.user?.id

    try {
        const { name } = await req.json()
        await connectMongoDB()
        Salas.create({ name: name, members: {id_user: id}})
        return NextResponse.json({ message: "Sala registrada." }, { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { message: "Ocorreu um erro ao registrar a sala." },
            { status: 500 }
        )
    }
}
import { connectMongoDB } from "../../../lib/mongodb"
import Salas from "../../../models/salas"
import { NextResponse } from "next/server"

export async function POST(req) {

    try {
        const { name, id } = await req.json()
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
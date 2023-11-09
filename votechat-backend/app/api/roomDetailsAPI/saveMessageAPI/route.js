import { connectMongoDB } from "../../../lib/mongodb"
import { NextResponse } from "next/server"
import Salas from "../../../models/salas"

export async function POST(req) {

    try {
        const { mensagemToDB, id_sala } = await req.json()
        await connectMongoDB()
        const sala = await Salas.findByIdAndUpdate(
            id_sala,
            { $push: { mensagens: mensagemToDB } },
            { new: true }
        )
        console.log(sala)
        return NextResponse.json({ message: "Mensagem salva na sala." }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Sala não encontrada." },
            { status: 500 }
        );
    }
}
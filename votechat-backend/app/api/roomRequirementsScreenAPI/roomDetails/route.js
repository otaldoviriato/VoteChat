import { connectMongoDB } from "../../../../lib/mongodb"
import Salas from "../../../../models/salas"
import { NextResponse } from "next/server"
import verifyToken from "../../verifyTokenFunction"

export async function POST(req) {
    try {
        const { id_sala } = await req.json()

        //Descriptografa o Token
        const DecryptedToken = await verifyToken(req.headers.get('authorization'))

        //Busca os dados no MongoDB
        await connectMongoDB()
        const sala = await Salas.findById(id_sala)

        //Devolve as informações como resposta da requisição
        return NextResponse.json({ sala })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false });
    }
}
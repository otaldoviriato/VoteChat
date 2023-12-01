import { connectMongoDB } from "../../../../lib/mongodb"
import Salas from "../../../../models/salas"
import { NextResponse } from "next/server"
import verifyToken from "../../verifyTokenFunction"

export async function POST(req) {
    try {
        //Acessa os dados da function verifyToken
        const { id_user, token } = await verifyToken(req.headers.get('authorization'))

        //Conecta ao MongoDB
        await connectMongoDB()

        //Acessa os dados do corpo da requisição
        const { id_sala } = await req.json()

        const sala = await Salas.findById(id_sala)

        //Devolve as informações como resposta da requisição
        return NextResponse.json( sala )
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false });
    }
}
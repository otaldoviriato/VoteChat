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
        const { roomName, roomDescription } = await req.json()

        //Cria o dado no MongoDB
        const createdRoom = await Salas.create({ name: roomName, description: roomDescription, members: { id_user: id_user } })

        //Devolve as informações como resposta da requisição
        return NextResponse.json({ roomData: createdRoom, token: token, status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false });
    }
}
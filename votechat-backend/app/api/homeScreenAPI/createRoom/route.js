import { connectMongoDB } from "../../../../lib/mongodb"
import Salas from "../../../../models/salas"
import { NextResponse } from "next/server"
import verifyToken from "../../verifyTokenFunction"

export async function POST(req) {
    try {
        const { roomName, roomDescription } = await req.json()
        console.log(roomName)

        //Descriptografa o Token
        const DecryptedToken = await verifyToken(req.headers.get('authorization'))

        //Busca os dados no MongoDB
        await connectMongoDB()
        const createdRoom = await Salas.create({ name: roomName, description: roomDescription, members: { id_user: DecryptedToken.id.id_user } })

        //Devolve as informações como resposta da requisição
        return NextResponse.json({ roomData: createdRoom, token: DecryptedToken.token, status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false });
    }
}
import { connectMongoDB } from "../../../../lib/mongodb"
import User from "../../../../models/user"
import Salas from "../../../../models/salas"
import { NextResponse } from "next/server"
import verifyToken from "../../verifyTokenFunction"

export async function POST(req) {
    const authorizationHeader = req.headers.get('authorization')
        const {roomName, roomDescription} = await req.json()
        const res = await verifyToken(authorizationHeader)
        console.log(res)
        await connectMongoDB()
        const createdRoom = await Salas.create({ name: roomName, description: roomDescription, members: { id_user: res.idid } })
       
        return NextResponse.json({ createdRoom, token: res.token })
}
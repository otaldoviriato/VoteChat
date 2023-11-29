import { connectMongoDB } from "../../../../lib/mongodb"
import Salas from "../../../../models/salas"
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export async function POST(req) {
    try {
        const { id_sala } = await req.json()

        //Descriptografa o Token
        const id_user = jwt.verify(req.headers.get('authorization'), process.env.SECRET_KEY).id_user

        //Busca os dados no MongoDB
        await connectMongoDB()
        const sala = await Salas.findById(id_sala)

        //Devolve as informações como resposta da requisição
        return NextResponse.json( sala )
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false });
    }
}
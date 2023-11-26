import { connectMongoDB } from "../../../../lib/mongodb"
import Salas from "../../../../models/salas"
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export async function POST(req) {
    let id_user;
    let newUserToken;

    await connectMongoDB()

    try {
        //Verfica se recebeu o token e decide se decodifica ou cria um novo usuário
        if(req.headers.get('authorization')){
            // Decodifica o token
            id_user = jwt.verify(req.headers.get('authorization'), process.env.SECRET_KEY).id_user
        } else {
            const createdUser = await User.create({})
            id_user = createdUser._id
            
            // Se o token não existe, cria um novo
            newUserToken = jwt.sign({ id_user }, process.env.SECRET_KEY)
        }

        //Acessa os dados do corpo da requisição
        const { roomName, roomDescription } = await req.json()

        //Busca os dados no MongoDB

        const createdRoom = await Salas.create({ name: roomName, description: roomDescription, members: { id_user: id_user } })

        //Devolve as informações como resposta da requisição
        return NextResponse.json({ roomData: createdRoom, token: newUserToken, status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false });
    }
}
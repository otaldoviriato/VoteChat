import { connectMongoDB } from "../../../../lib/mongodb";
import Salas from "../../../../models/salas";
import { NextResponse } from "next/server";
import User from "../../../../models/user"
import jwt from 'jsonwebtoken'

export async function POST(req) {
    let id_user;
    let newUserToken;

    await connectMongoDB()

    try {
        //Verfica se recebeu o token e decide se decodifica ou cria um novo usuário
        if (req.headers.get('authorization')) {
            // Decodifica o token
            id_user = jwt.verify(req.headers.get('authorization'), process.env.SECRET_KEY).id_user
        } else {
            const createdUser = await User.create({})
            id_user = createdUser._id

            // Se o token não existe, cria um novo
            newUserToken = jwt.sign({ id_user }, process.env.SECRET_KEY)
        }

        //Busca os dados no MongoDB
        const salasUsuario = await Salas.find({ 'members.id_user': id_user }).exec()

        /*
            Tratar os dados de sala para que sejam devolvidos com os dados de cada usuário.
        */

        //Devolve as informações como resposta da requisição
        return NextResponse.json(salasUsuario)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false });
    }
}
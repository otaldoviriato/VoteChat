import { connectMongoDB } from "../../../../lib/mongodb";
import Salas from "../../../../models/salas";
import { NextResponse } from "next/server";
import verifyToken from "../../verifyTokenFunction"

export async function POST(req) {
    try {
        //Acessa os dados da function verifyToken
        const { id_user, token } = await verifyToken(req.headers.get('authorization'))

        //Conecta ao MongoDB
        await connectMongoDB()

        //Busca os dados no MongoDB
        const salasUsuario = await Salas.find({ 'members.id_user': id_user }).exec()


        /*
            Tratar os dados de sala para que sejam devolvidos com os dados de cada usuário.
        */

        //Devolve as informações como resposta da requisição
        return NextResponse.json({ roomData: salasUsuario, token: token })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false });
    }
}
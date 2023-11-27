import { connectMongoDB } from "../../../../lib/mongodb";
import Salas from "../../../../models/salas";
import User from "../../../../models/user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  let id_user;

  await connectMongoDB();

  try {
    // Acessa os dados do corpo da requisição
    const { id_sala, token_user } = await req.json();

    // Decodifica o token
    id_user = jwt.verify(token_user, process.env.SECRET_KEY).id_user;

    // Busca os dados no MongoDB
    const roomDetails = await Salas.findById(id_sala).exec();

    // Array para armazenar informações de usuários
    const usersInfo = [];

    // Loop através dos IDs de remetentes em roomDetails.mensagens
    for (let mensagem of roomDetails.mensagens) {
      const remetenteId = mensagem.remetente;

      // Busca informações do usuário no banco de dados
      const userInfo = await User.findById(remetenteId).exec();

      // Adiciona as informações do usuário ao array
      usersInfo.push(userInfo);

      // Substitui o campo remetente pelo objeto userInfo na mensagem
      mensagem.remetente = userInfo;
    }

    // Devolve as informações como resposta da requisição
    return NextResponse.json( roomDetails );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, success: false });
  }
}

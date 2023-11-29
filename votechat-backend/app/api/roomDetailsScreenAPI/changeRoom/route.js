import { connectMongoDB } from "../../../../lib/mongodb"
import { NextResponse } from "next/server"
import Salas from "../../../../models/salas"
import User from "../../../../models/user"
import jwt from 'jsonwebtoken'

export async function POST(req) {
  try {
    let id_user, newUserToken

    // Verifica se recebeu o token e decide se decodifica ou cria um novo usuário
    if (req.headers.get('authorization')) {
      // Decodifica o token
      id_user = jwt.verify(req.headers.get('authorization'), process.env.SECRET_KEY).id_user;
    } else {
      const createdUser = await User.create({});
      id_user = createdUser._id;

      // Se o token não existe, cria um novo
      newUserToken = jwt.sign({ id_user }, process.env.SECRET_KEY);
    }

    const data = await req.json()
    const id_sala = data.id_sala
    const pedidoEm = data.pedidoEm
    const action = data.action
    const actionData = data.actionData
    const actionDescription = data.actionDescription
    await connectMongoDB()

    // Procurar a sala pelo id_sala
    const sala = await Salas.findById(id_sala)

    if (!sala) {
      return NextResponse.json({ status: 404 })
    }

    // Verificar se o usuário já foi encontrado em membros ou pendentes
    const membroEncontrado = sala.members && sala.members.find(member => member.id_user && member.id_user.toString() === id_user.toString())
    const pendenteEncontrado = sala.pendentes && sala.pendentes.find(pendente => pendente.id_user && pendente.id_user.toString() === id_user.toString())

    if (membroEncontrado || pendenteEncontrado) {
      return NextResponse.json({ status: 401 });
    } else {

      // Adicionar o usuário na lista de pendentes
      sala.votations.push({
        id_solicitante: id_user,
        pedidoEm: pedidoEm,
        action: action,
        actionData: actionData,
        actionDescription: actionDescription,
      })

      // Salvar as alterações no banco de dados
      const updatedSala = await sala.save({ validateBeforeSave: false })

      return NextResponse.json({ status: 201 })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error.message, success: false })
  }
}
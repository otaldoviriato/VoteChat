import { connectMongoDB } from "../../../../lib/mongodb"
import { NextResponse } from "next/server"
import Salas from "../../../../models/salas"
import verifyToken from "../../verifyTokenFunction"

export async function POST(req) {
  try {
    //Acessa os dados da function verifyToken
    const { id_user, token } = await verifyToken(req.headers.get('authorization'))

    //Conecta ao MongoDB
    await connectMongoDB()

    //Acessa os dados do corpo da requisição
    const { id_sala, pedidoEm, action, actionData, actionDescription } = await req.json()

    // Procurar a sala pelo id_sala
    const sala = await Salas.findById(id_sala)

    if (!sala) {
      return NextResponse.json({ status: 404 })
    }

    // Verificar se o usuário já foi encontrado em membros ou pendentes
    const membroEncontrado = sala.members && sala.members.find(member => member.id_user && member.id_user.toString() === id_user.toString())
    const pendenteEncontrado = sala.pendentes && sala.pendentes.find(pendente => pendente.id_user && pendente.id_user.toString() === id_user.toString())

    if (membroEncontrado || pendenteEncontrado) {
      return NextResponse.json({ status: 401 })

    } else {

      // Adicionar o usuário na lista de votations
      sala.votations.push({
        id_solicitante: id_user,
        pedidoEm: pedidoEm,
        action: action,
        actionData: id_user,
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
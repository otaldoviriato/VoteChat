import { connectMongoDB } from "../../../../lib/mongodb"
import { NextResponse } from "next/server"
import Salas from "../../../../models/salas"
import verifyToken from "../../verifyTokenFunction"

export async function POST(req) {
  try {
    const authorizationHeader = req.headers.get('authorization')
    console.log(req.headers.get('authorization'))
    const res = await verifyToken(authorizationHeader)
    const id_user = res.id.id_user

    
    const data = await req.json()
    const id_sala = data.id_sala
    const pedidoEm = data.pedidoEm
    const answer = data.answer
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
      sala.pendentes.push({
        id_user: id_user,
        pedidoEm: pedidoEm,
        dados: [
          {
            answers: answer,
            picture: null, // Se necessário, adicione a lógica para incluir uma imagem
          },
        ],
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
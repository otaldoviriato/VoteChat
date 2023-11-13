import { connectMongoDB } from "../../../../lib/mongodb"
import { NextResponse } from "next/server"
import Salas from "../../../../models/salas"

export async function POST(req) {
  try {
    const { id_sala, id_user } = await req.json()
    await connectMongoDB()

    // Procurar a sala pelo id_sala
    const sala = await Salas.findById(id_sala)

    if (!sala) {
      return NextResponse.json({ message: "Sala não encontrada", success: false, status: 400 })
    }

    // Verificar se o usuário já foi encontrado em membros ou pendentes
    const membroEncontrado = sala.membros && sala.membros.find(member => member.id_user.toString() === id_user.toString())
    const pendenteEncontrado = sala.pendentes && sala.pendentes.find(pendente => pendente.id_user.toString() === id_user.toString())

    if (membroEncontrado || pendenteEncontrado) {
      return NextResponse.json({ message: "Usuário já encontrado na lista de membros ou pendentes", success: false, status: 401 })
    }

    // Adicionar o usuário na lista de pendentes
    sala.pendentes.push({
      id_user: id_user,
    })

    // Salvar as alterações no banco de dados
    const updatedSala = await sala.save()

    return NextResponse.json({ message: "Usuário adicionado em pendentes", success: true, status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error.message, success: false })
  }
}

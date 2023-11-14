import { connectMongoDB } from "../../../../lib/mongodb"
import Salas from "../../../../models/salas"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { id_sala, id_votado, voto, id_votante } = await req.json()
    await connectMongoDB()

    // Procurar a sala pelo id_sala
    const sala = await Salas.findById(id_sala)

    if (!sala) {
      return NextResponse.json({ message: "Sala não encontrada", success: false })
    }

    // Encontrar o objeto correspondente ao id_votado dentro do array pendentes
    const pendenteEncontrado = sala.pendentes.find(pendente => pendente.id_user.toString() === id_votado.toString())

    if (!pendenteEncontrado) {
      return NextResponse.json({ message: "Usuário não encontrado na lista de pendentes", success: false })
    }

    // Adicionar o voto favorável no array votos do objeto encontrado
    pendenteEncontrado.votos.push({
      favoravel: voto,
      id_user: id_votante,
    })

    // Salvar as alterações no banco de dados
    const updatedSala = await sala.save()

    return NextResponse.json(updatedSala)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error.message, success: false })
  }
}
import { connectMongoDB } from "../../../../lib/mongodb"
import Salas from "../../../../models/salas"
import { NextResponse } from "next/server"

export async function POST(req) {
    let votedUser

  try {
    const { id_sala, id_votado } = await req.json()
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

    // Contar a quantidade de votos "true" e "false"
    const countVotes = pendenteEncontrado.votos.length
    const countTrue = pendenteEncontrado.votos.filter(v => v.favoravel === true).length
    const countFalse = pendenteEncontrado.votos.filter(v => v.favoravel === false).length
    const countMembers = sala.members.length
    const percentageTrue = (countTrue / (countTrue + countFalse)) * 100
    console.log(countMembers)

    if (countMembers == countVotes && percentageTrue > 80) {
        // Se countTrue for maior que countFalse, mover o usuário de pendentes para members
        const index = sala.pendentes.findIndex((pendente) => pendente.id_user.toString() === id_votado.toString())
        const votedUser = sala.pendentes.splice(index, 1)[0]
        sala.members.push(votedUser)
        await sala.save()
      }

      return NextResponse.json({ votedUser })
    } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error.message, success: false })
  }
}

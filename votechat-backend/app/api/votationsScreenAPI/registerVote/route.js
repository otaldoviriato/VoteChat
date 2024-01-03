import { connectMongoDB } from "../../../../lib/mongodb"
import Salas from "../../../../models/salas"
import { NextResponse } from "next/server"
import verifyToken from "../../verifyTokenFunction"

export async function POST(req) {
  try {
    const { id_user, token } = await verifyToken(req.headers.get('authorization'))

    await connectMongoDB()

    const { id_sala, id_votacao, voto } = await req.json()

    const sala = await Salas.findById(id_sala)

    if (!sala) {
      return NextResponse.json({ message: "Sala não encontrada", success: false })
    }

    const votaçãoEncontrada = sala.votations.find(votation => votation._id.toString() === id_votacao.toString())

    if (!votaçãoEncontrada) {
      return NextResponse.json({ message: "Usuário não encontrado na lista de votations", success: false })
    }

    votaçãoEncontrada.votos.push({
      favoravel: voto,
      id_votante: id_user,
    })

    const updatedSala = await sala.save()    

    return NextResponse.json(updatedSala)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error.message, success: false })
  }
}
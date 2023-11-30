import { connectMongoDB } from "../../../../lib/mongodb"
import Salas from "../../../../models/salas"
import { NextResponse } from "next/server"
import verifyToken from "../../verifyTokenFunction"

export async function POST(req) {
  try {
    //Acessa os dados da function verifyToken
    const { id_user, token } = await verifyToken(req.headers.get('authorization'))

    //Conecta ao MongoDB
    await connectMongoDB()

    //Acessa os dados do corpo da requisição
    const { id_sala, id_votado, voto } = await req.json()

    // Procurar a sala pelo id_sala
    const sala = await Salas.findById(id_sala)

    if (!sala) {
      return NextResponse.json({ message: "Sala não encontrada", success: false })
    }

    // Encontrar o objeto correspondente ao id_votado dentro do array votations
    const votaçãoEncontrada = sala.votations.find(votation => votation._id.toString() === id_votado.toString())

    if (!votaçãoEncontrada) {
      return NextResponse.json({ message: "Usuário não encontrado na lista de votations", success: false })
    }

    // Adicionar o voto favorável no array votos do objeto encontrado
    votaçãoEncontrada.votos.push({
      favoravel: voto,
      id_votante: id_user,
    })

    // Salvar as alterações no banco de dados
    const updatedSala = await sala.save()

    return NextResponse.json(updatedSala)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error.message, success: false })
  }
}
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
    const percentageRoom = 80

    if (!pendenteEncontrado) {
      return NextResponse.json({ message: "Usuário não encontrado na lista de pendentes", success: false })
    }

    // Contar a quantidade de votos "true", "false", total e a quantidade de membros
    const countVotes = pendenteEncontrado.votos.length
    const countTrue = pendenteEncontrado.votos.filter(v => v.favoravel === true).length
    const countFalse = pendenteEncontrado.votos.filter(v => v.favoravel === false).length
    const countMembers = sala.members.length

    //Faz a porcentagem de aceitação do usuário no grupo
    const percentageTrue = (countTrue / (countTrue + countFalse)) * 100

    // Obtém a data atual
    const dataAtual = new Date();

    // Obtém a data do campo "pedidoEm" do objeto pendenteEncontrado
    const dataPedidoEm = new Date(pendenteEncontrado.pedidoEm);

    // Calcula a diferença em milissegundos entre as duas datas
    const diferencaEmMilissegundos = dataAtual - dataPedidoEm;

    // Calcula a diferença em dias
    const diferencaEmDias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24)

    if (countMembers == countVotes || diferencaEmDias > 7) {
      if (percentageTrue > percentageRoom) {

        // Se percentageTrue for maior que 80%, mover o usuário de pendentes para members
        const index = sala.pendentes.findIndex((pendente) => pendente.id_user.toString() === id_votado.toString())
        const votedUser = sala.pendentes.splice(index, 1)[0]
        sala.members.push(votedUser)
        await sala.save()

      } else {

        // Se percentageTrue for menor que 80%, remover o usuário de pendentes
        const index = sala.pendentes.findIndex((pendente) => pendente.id_user.toString() === id_votado.toString())
        const votedUser = sala.pendentes.splice(index, 1)[0]
        await sala.save()
      }
    } else {
      //Se todos os membros ainda não votaram ou se não se passaram 7 dias não faz nada
    }

    return NextResponse.json({ votedUser })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error.message, success: false })
  }
}
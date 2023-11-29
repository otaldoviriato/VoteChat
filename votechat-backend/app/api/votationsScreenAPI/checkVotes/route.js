import { connectMongoDB } from "../../../../lib/mongodb"
import Salas from "../../../../models/salas"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { id_sala } = await req.json()
    await connectMongoDB()

    // Procura a sala pelo id_sala
    const sala = await Salas.findById(id_sala)

    if (!sala) {
      return NextResponse.json({ message: "Sala não encontrada", success: false })
    }

    // Encontra todas as votações da sala
    const votacoes = sala.votations;

    // Obtém a data atual
    const dataAtual = new Date();

    // Filtra as votações que passaram 7 dias desde o pedidoEm
    const votacoesExpiradas = votacoes.filter(votacao => {
      // Obtém a data do campo "pedidoEm" do objeto votacao
      const dataPedidoEm = new Date(votacao.pedidoEm);

      // Calcula a diferença em milissegundos entre as duas datas
      const diferencaEmMilissegundos = dataAtual - dataPedidoEm;

      // Calcula a diferença em dias
      const diferencaEmDias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24)

      // Verifica se a diferença é maior ou igual a 7 dias
      return diferencaEmMilissegundos >= 7
    })

    for (const votacaoExpirada of votacoesExpiradas) {
      // Buscar no DB a porcentagem certa
      const percentageRoom = 80

      // Contar a quantidade de votos "true", "false", total e a quantidade de membros
      const countVotes = votacaoExpirada.votos.length
      const countTrue = votacaoExpirada.votos.filter(v => v.favoravel === true).length
      const countFalse = votacaoExpirada.votos.filter(v => v.favoravel === false).length
      const countMembers = votacaoExpirada.length

      //Faz a porcentagem de aceitação do usuário no grupo
      const percentageTrue = (countTrue / (countTrue + countFalse)) * 100
      const temporaryPercentageTrue = 90

      if (votacaoExpirada.action === 'add_member') {
        if (temporaryPercentageTrue > percentageRoom) {

          // // Se percentageTrue for maior que 80%, mover o usuário de votations para members
          // const index = sala.votations.findIndex((votation) => votation.id_user.toString() === id_votado.toString())
          // const votedUser = sala.votations.splice(index, 1)[0]
          // sala.members.push(votedUser)
          // await sala.save()
          console.log('deu certo - add_member')

        } else {
          // Se percentageTrue for menor que 80%, remover o usuário de pendentes
          const index = sala.votations.findIndex((votation) => votation.id_user.toString() === id_votado.toString())
          const votedUser = sala.votations.splice(index, 1)[0]
          await sala.save()
        }

      } else if (votacaoExpirada.action === 'remove_member') {
        if (temporaryPercentageTrue > percentageRoom) {

          // // Se percentageTrue for maior que 80%, remover o usuário de members
          // const index = sala.members.findIndex((member) => member.id_user.toString() === id_votado.toString())
          // const votedUser = sala.members.splice(index, 1)[0]
          // await sala.save()
          console.log('deu certo - remove_member')

        }

      } else if (votacaoExpirada.action === 'change_config') {
        // Ação específica para 'outra_acao'
        console.log('deu certo - change_config')
        
      }else if (votacaoExpirada.action === 'change_config') {
        // Ação específica para 'outra_acao'
        console.log('deu certo - change_config')

      } else {
        // Ação padrão para outros casos
        console.log('deu certo mas não é add_member ou outra_acao')
      }
    }

    return NextResponse.json({ message: "Operação concluída", success: true })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error.message, success: false })
  }
}

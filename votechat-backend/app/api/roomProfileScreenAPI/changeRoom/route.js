import { connectMongoDB } from "../../../../lib/mongodb"
import { NextResponse } from "next/server"
import Salas from "../../../../models/salas"
import verifyToken from "../../verifyTokenFunction"

export async function POST(req) {
  try {
    const { id_user, token } = await verifyToken(req.headers.get('authorization'))

    await connectMongoDB()

    const { id_sala, votationType, data } = await req.json()

    const sala = await Salas.findById(id_sala)

    if (!sala) {
      return NextResponse.json({ status: 404 })
    }

    if (votationType === 'general') {

      sala.votations = sala.votations || {}
      sala.votations.general = sala.votations.general || []

      sala.votations.general.push({
        description: data.description,
        creator_user_id: id_user
      })

    } else if (votationType === 'configuration') {
      const configurationType = data.configurationType

      sala.votations = sala.votations || {}
      sala.votations.configuration = sala.votations.configuration || {}

      if (configurationType === 'name') {
        sala.votations.configuration.name.push({
          new_value: data.newValue,
          creator_user_id: id_user
        })

      } else if (configurationType === 'description') {
        sala.votations.configuration.description.push({
          new_value: data.newValue,
          creator_user_id: id_user
        })

      } else if (configurationType === 'quorum') {
        sala.votations.configuration.quorum.push({
          new_value: data.newValue,
          creator_user_id: id_user
        })

      } else if (configurationType === 'votingDuration') {
        sala.votations.configuration.votingDuration.push({
          new_value: data.newValue,
          creator_user_id: id_user
        })

      } else {
        return NextResponse.json({ message: "Tipo de configuração inválido", success: false })
      }

    } else if (votationType === 'user') {
      console.log('Entered User Votation Block')
      const action = data.action

      sala.votations = sala.user || {}
      sala.votations.configuration = sala.votations.user || []

      if (action === 'add') {
        sala.votations.user.push({
          action: data.action,
          affected_user_id: id_user,
          creator_user_id: id_user
        })

      } else if (action === 'remove') {
        sala.votations.user.push({
          action: data.action,
          affected_user_id: data.affected_user_id,
          creator_user_id: id_user
        })

      } else {
        return NextResponse.json({ message: "Ação de usuário inválida", success: false })
      }

    } else {
      return NextResponse.json({ message: "Tipo inválido", success: false })
    }

    const updatedSala = await sala.save({ validateBeforeSave: false })

    return NextResponse.json({ status: 201 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error.message, success: false })
  }
}
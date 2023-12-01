import { connectMongoDB } from "../../../../lib/mongodb"
import { NextResponse } from "next/server"
import Salas from "../../../../models/salas"
import verifyToken from "../../verifyTokenFunction"
import verifyMember from "./functions/verifyMember"

export async function POST(req) {
  try {
    const { id_user, token } = await verifyToken(req.headers.get('authorization'))

    await connectMongoDB()

    const { id_sala, pedidoEm, action, actionData, actionDescription } = await req.json()

    const sala = await Salas.findById(id_sala)

    if (!sala) {
      return NextResponse.json({ status: 404 })
    }

    console.log( 'id_user: ', id_user, 'token: ',  token )

    if (await verifyMember(sala, id_user, token)) {

      return NextResponse.json({ status: 401 })

    } else {

      sala.votations.push({
        id_solicitante: id_user,
        pedidoEm: pedidoEm,
        action: action,
        actionData: actionData,
        actionDescription: actionDescription,
      })

      const updatedSala = await sala.save({ validateBeforeSave: false })

      return NextResponse.json({ status: 201 })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error.message, success: false })
  }
}
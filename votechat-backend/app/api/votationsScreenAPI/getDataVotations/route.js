import { connectMongoDB } from "../../../../lib/mongodb"
import Salas from "../../../../models/salas"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
      const { id_sala } = await req.json()
      await connectMongoDB()
      // Consulte o banco de dados para obter informações dos remetentes com base em remetentesUnicos
      const roomData = await Salas.findById(id_sala).exec()
      return NextResponse.json(roomData.votations)
    } catch (error) {
      console.log(error)
      return NextResponse.json({ message: error, success: false })
    }
  }
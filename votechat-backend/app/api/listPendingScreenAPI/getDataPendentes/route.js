import { connectMongoDB } from "../../../../lib/mongodb"
import User from "../../../../models/user"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
      const { Pendentes } = await req.json()
      await connectMongoDB()
      // Consulte o banco de dados para obter informações dos remetentes com base em remetentesUnicos
      const dataPendentes = await User.find({ _id: { $in: Pendentes } }).exec()
      return NextResponse.json(dataPendentes)
    } catch (error) {
      console.log(error)
      return NextResponse.json({ message: error, success: false })
    }
  }
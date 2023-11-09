import { connectMongoDB } from "../../../../lib/mongodb"
import User from "../../../../models/user"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
      const { remetentesUnicos } = await req.json()
      await connectMongoDB()
      // Consulte o banco de dados para obter informações dos remetentes com base em remetentesUnicos
      const dataRemetentes = await User.find({ _id: { $in: remetentesUnicos } }).exec()
      return NextResponse.json(dataRemetentes)
    } catch (error) {
      console.log(error)
      return NextResponse.json({ message: error, success: false })
    }
  }
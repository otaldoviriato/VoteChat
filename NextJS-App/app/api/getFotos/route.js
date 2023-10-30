import { connectMongoDB } from "../../../lib/mongodb"
import { NextResponse } from "next/server"
import Fotos from "../../../models/fotos"

export async function POST(req) {
    try {
        const { id } = await req.json()
        await connectMongoDB()
        const fotosUsuario = await Fotos.find({ user: id, active: true }).exec()
        return NextResponse.json(fotosUsuario)
      } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false })
      }
}
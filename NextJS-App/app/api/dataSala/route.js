import { connectMongoDB } from "../../../lib/mongodb"
import { NextResponse } from "next/server"
import Salas from "../../../models/salas"

export async function POST(req) {
    try {
        const { id } = await req.json()
        await connectMongoDB()
        const SalaData = await Salas.findById(id).exec()
        return NextResponse.json(SalaData)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false })
    }
}
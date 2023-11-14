import { connectMongoDB } from "../../../../lib/mongodb";
import Salas from "../../../../models/salas";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { id } = await req.json()
        await connectMongoDB()
        const salasUsuario = await Salas.find({ 'members.id_user': id }).exec()
        return NextResponse.json(salasUsuario)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false });
    }
}
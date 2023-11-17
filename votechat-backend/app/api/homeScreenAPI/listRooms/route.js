import { connectMongoDB } from "../../../../lib/mongodb";
import Salas from "../../../../models/salas";
import { NextResponse } from "next/server";
import verifyToken from "../../verifyTokenFunction"

export async function POST(req) {
    try {
        const res = await verifyToken(req.headers.get('authorization'))
        await connectMongoDB(res)
        const salasUsuario = await Salas.find({ 'members.id_user': res.id.id_user }).exec()
        console.log(salasUsuario)
        return NextResponse.json(salasUsuario)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false });
    }
}
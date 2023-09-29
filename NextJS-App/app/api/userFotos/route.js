import { getServerSession } from "next-auth";
import { connectMongoDB } from "../../../lib/mongodb";
import Fotos from "../../../models/fotos";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req, res) {
    const session = await getServerSession(req, res, authOptions)
    const id = session?.user?.id
    try {
        await connectMongoDB()
        const fotosUsuario = await Fotos.find({ user: id, active: true }).exec()
        console.log("fotos: ", fotosUsuario)
        return NextResponse.json(fotosUsuario)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false });
    }
}
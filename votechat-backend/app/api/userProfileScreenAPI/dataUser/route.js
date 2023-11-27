import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import { NextResponse } from "next/server";
import verifyToken from "../../verifyTokenFunction"

export async function POST(req) {
    try {
        const res = await verifyToken(req.headers.get('authorization'))
        await connectMongoDB()
        const id_user = res.id.id_user
        const dataUser = await User.findById(id_user).exec()
        console.log(dataUser)
        return NextResponse.json(dataUser)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false });
    }
}
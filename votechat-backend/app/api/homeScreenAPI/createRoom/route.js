import { connectMongoDB } from "../../../../lib/mongodb"
import User from "../../../../models/user"
import { NextResponse } from "next/server"

export async function POST(req) {
    const authorizationHeader = req.headers.get('authorization')

        await connectMongoDB()
        const user = await User.create({})

        const userId = user._id
       
        return NextResponse.json({ data: userId });

}
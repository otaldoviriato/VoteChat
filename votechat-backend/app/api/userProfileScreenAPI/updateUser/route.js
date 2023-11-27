import { connectMongoDB } from "../../../../lib/mongodb"
import User from "../../../../models/user"
import { NextResponse } from "next/server"
import verifyToken from "../../verifyTokenFunction"

export async function POST(req) {
    try {
        const tokenVerification = await verifyToken(req.headers.get('authorization'))
        await connectMongoDB()
        const id_user = tokenVerification.id.id_user
        const user = await User.findById(id_user).exec()

        if (!user) {
            return NextResponse.json({ message: "User not found", success: false })
        }

        // Update the user fields
        const data = await req.json()
        if (data.name) user.name = data.name
        if (data.email) user.email = data.email
        // Fazer lógica para salvar path no DB e foto no servidor
        if (data.profilePicture) user.profilePicture = data.profilePicture

        // Save the updated user
        const updatedUser = await user.save()

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ message: error.message || "Internal Server Error", success: false })
    }
}

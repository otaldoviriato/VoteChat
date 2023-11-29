import { connectMongoDB } from "../../../../lib/mongodb"
import User from "../../../../models/user"
import { NextResponse } from "next/server"
import verifyToken from "../../verifyTokenFunction"

export async function POST(req) {
    let id_user
    let newUserToken 

    try {
        //Verfica se recebeu o token e decide se decodifica ou cria um novo usuário
        if(req.headers.get('authorization')){
            // Decodifica o token
            id_user = jwt.verify(req.headers.get('authorization'), process.env.SECRET_KEY).id_user
        } else {
            const createdUser = await User.create({})
            id_user = createdUser._id
            
            // Se o token não existe, cria um novo
            newUserToken = jwt.sign({ id_user }, process.env.SECRET_KEY)
        }

        await connectMongoDB()

        const user = await User.findById(id_user).exec()

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

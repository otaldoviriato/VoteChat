import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import { NextResponse } from "next/server";
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
        const dataUser = await User.findById(id_user).exec()
        console.log(dataUser)
        return NextResponse.json(dataUser)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false });
    }
}
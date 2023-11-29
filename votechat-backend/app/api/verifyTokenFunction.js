import { connectMongoDB } from "../../lib/mongodb"
import User from "../../models/user"
import jwt from 'jsonwebtoken'

export default async function verifyToken(token) {
    //Verfica se recebeu o token e decide se decodifica ou cria um novo usuário
    if (token) {
        // Decodifica o token
        return { id_user: jwt.verify(token, process.env.SECRET_KEY), token: null }
    } else {
        //Conecta ao MongoDB
        await connectMongoDB()

        //Cria o dado no MongoDB
        const createdUser = await User.create({})

        return { id_user: createdUser._id, token: jwt.sign( createdUser._id.toJSON() , process.env.SECRET_KEY) }
    }
}
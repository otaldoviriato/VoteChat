import { connectMongoDB } from "../../lib/mongodb"
import User from "../../models/user"
import jwt from 'jsonwebtoken'

export default async function verifyToken(token) {
    const key = process.env.SECRET_KEY
    try {
        if (token) {
            // Verificar e decodificar o token
            const decodedToken = jwt.verify(token, key)

            // Retorna o valor decodificado do token, incluindo o token
            return { token, id: decodedToken }
        } else {
            await connectMongoDB()
            const createdUser = await User.create({})
            const id_user = createdUser._id
            
            // Se o token não existe, crie um novo
            const newUserToken = jwt.sign({ id_user }, key)

            // Retorna o novo token e o ID do usuário
            return { token: newUserToken, id: id_user }
        }
    } catch (error) {
        console.error('Erro ao verificar/descriptografar o token:', error.message)
        throw new Error('Erro ao verificar/descriptografar o token')
    }
}

import { connectMongoDB } from "../../../../lib/mongodb"
import User from "../../../../models/user"
import jwt from 'jsonwebtoken'
import User from "@/models/user"

// Função para descriptografar o token
export default async function verifyToken(token) {
    try {
        if (token) {
            // Verificar e decodificar o token
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY)

            // Retorna o valor decodificado do token
            return decodedToken
        } else {
            await connectMongoDB
            const createdUser = await User.create()
            // Se o token não existe, crie um novo
            const newUserToken = jwt.sign({ id_user: createdUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' })

            // Retorna o novo token
            return newUserToken
        }
    } catch (error) {
        // Lidar com erros, por exemplo, token inválido
        console.error('Erro ao verificar/descriptografar o token:', error.message)
        throw new Error('Erro ao verificar/descriptografar o token')
    }
}
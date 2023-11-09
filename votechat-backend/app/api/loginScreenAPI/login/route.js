import { connectMongoDB } from "../../../../lib/mongodb"
import User from "../../../../models/user"
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req) {

    try {
        const { email, senha } = await req.json()
        await connectMongoDB()
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json(
                { message: "Usuário não encontrado." },
                { status: 404 }
            )
        }

        // Comparar a senha inserida com a senha armazenada no banco de dados
        if (await bcrypt.compare(senha, user.senha)) {
            return NextResponse.json(
                {
                    message: "Autenticação bem-sucedida.",
                    data: user,
                    status: 200
                }
            )
        } else {
            return NextResponse.json(
                { message: "Senha incorreta." },
                { status: 401 }
            )
        }
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({ message: "Erro interno." }, { status: 500 })
    }
}
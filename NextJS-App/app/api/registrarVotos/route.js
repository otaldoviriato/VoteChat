import { getServerSession } from "next-auth"
import { connectMongoDB } from "../../../lib/mongodb"
import Salas from "../../../models/salas"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"

export async function POST(req) {
    const session = await getServerSession(authOptions)
    const id_votante = session?.user?.id

    try {
        const { id_sala, id_user, voto } = await req.json()
        await connectMongoDB()

        // Crie um novo voto
        const novoVoto = {
            favoravel: voto,
            id_user: id_votante
        }

        // Atualize o documento da sala usando findByIdAndUpdate
        const salaAtualizada = await Salas.findByIdAndUpdate(
            id_sala,
            {
                $push: {
                    'pendentes.$[elem].votos': novoVoto
                }
            },
            {
                new: true, // Retorna o documento atualizado
                arrayFilters: [{ 'elem.id_user': id_user }] // Filtra o array pendentes pelo id_user correspondente
            }
        )

        // Verifique se a sala foi encontrada e atualizada
        if (!salaAtualizada) {
            throw new Error('Sala não encontrada ou não atualizada');
        }

        console.log('Dados inseridos com sucesso.')

        return NextResponse.json(
            { message: "Voto registrado." },
            { status: 201 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: "Ocorreu um erro ao registrar o voto." },
            { status: 500 }
        )}

}
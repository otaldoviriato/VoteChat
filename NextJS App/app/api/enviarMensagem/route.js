import { getServerSession } from "next-auth"
import { connectMongoDB } from "../../../lib/mongodb"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"
import Salas from "../../../models/salas"

export async function POST(req) {
  const session = await getServerSession(authOptions)
  const id = session?.user?.id

  try {
    const { mensagem , id_sala} = await req.json()
    await connectMongoDB()
    const resposta = await Salas.findByIdAndUpdate( id_sala , {$push:{mensagem: {id_user: id, conteudo: mensagem }}})
    console.log(resposta)
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
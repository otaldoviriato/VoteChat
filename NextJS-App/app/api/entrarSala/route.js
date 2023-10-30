import { connectMongoDB } from "../../../lib/mongodb"
import { NextResponse } from "next/server"
import Salas from "../../../models/salas"

export async function POST(req) {

  try {
    const { id_sala, id } = await req.json()
    await connectMongoDB()
    const resposta = await Salas.findByIdAndUpdate( id_sala , {$push:{pendentes: {id_user: id}}})
    console.log(resposta)
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    )
  }
}
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  
  try {
    const { name, email, senha } = await req.json();
    const hashedSenha = await bcrypt.hash(senha, 10);
    await connectMongoDB()
    const user = await User.create({ name, email, senha: hashedSenha})

    return NextResponse.json(
      { message: "Usuário registrado com sucesso!" ,
      data: user,
       status: 200 }
  )

} catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
} 
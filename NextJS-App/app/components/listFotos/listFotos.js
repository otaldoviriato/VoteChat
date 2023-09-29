import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { connectMongoDB } from '../../../lib/mongodb';
import Fotos from '../../../models/fotos';

async function getFotos() {
  const session = await getServerSession(authOptions)
  const id = session?.user?.id
  try {
    await connectMongoDB()
    const fotosUsuario = await Fotos.find({ user: id, active: true }).exec()
    return fotosUsuario
  } catch (error) {
    console.log(error)
    return error;
  }
}

export default async function ListFotos() {
  const data = await getFotos()
  return (<>
          {
            data.map((foto) => {
              return (
                <div key={foto.path}>
                  <img src={foto.path} />
                </div>
              )
            })
          }
  </>
  )
}
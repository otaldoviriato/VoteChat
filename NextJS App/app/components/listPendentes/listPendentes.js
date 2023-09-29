import React from 'react'
import { connectMongoDB } from '../../../lib/mongodb'
import Salas from '../../../models/salas'
import User from '../../../models/user'
import VotoButton from './buttons/votoButton/votoButton'

export default async function listPendentes({ id_sala }) {

  async function getDataSala() {
    try {
      await connectMongoDB()
      const pendentesData = await Salas.findById(id_sala, 'pendentes')
      return pendentesData.pendentes
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async function getDataUser() {
    try {
      await connectMongoDB()
      const data = await getDataSala()

      const nomePendentes = await Promise.all(data.map(async (item) => {
        const user = await User.findById(item.id_user)
        return {
          id_user: item.id_user,
          name: user ? user.name : null // Verifica se o usuário foi encontrado
        }
      }))

      return nomePendentes
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const user = await getDataUser()
  const sala_Id = id_sala

  return (
    <>
      <section className="bg-indigo-700 text-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full space-y-4 shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-indigo-800 dark:border-indigo-700">
            {user.map((item) => (
              <div className="grid-cols-1 p-6 bg-white rounded-lg space-y-4 md:space-y-6 sm:p-8 relative ">
                <h1 key={item.id_user} className="text-xl font-bold leading-tight tracking-tight text-indigo-700 md:text-2xl dark:text-white">
                  {item.name}
                  <div>
                    <VotoButton salaId = {sala_Id} userId = {item.id_user.toString()}/>
                  </div>
                </h1>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
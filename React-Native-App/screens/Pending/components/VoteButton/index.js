import React, { useContext } from 'react'
import { Button } from 'react-native'
import { AuthContext } from '../../../../context/authContext';

export default function VoteButton({ salaId, userId }) {
  const { user } = useContext(AuthContext)

  const handleSubmit = async (voto) => {

    try {
      const res = await fetch("http://192.168.100.5:3000/api/listPendingScreenAPI/registerVote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_sala: salaId,
          id_votado: userId,
          voto: voto,
          id_votante: user._id,
        }),
      })

      if (res.ok) {
        console.log('Voto computado')
        // Faça qualquer outra ação que você deseja quando o voto é bem-sucedido.
      } else {
        console.log("Votação falhou")
      }
    } catch (error) {
      console.log('error during registration')
    }

    try {
      const res = await fetch("http://192.168.100.5:3000/api/listPendingScreenAPI/checkVotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_sala: salaId,
          id_votado: userId
        }),
      })
  
      const data = await res.json();
      console.log(data)
  
    } catch (error) {
      console.log('error during registration')
    }
  }

  return (
    <>
      <Button
        title="Sim"
        onPress={() => handleSubmit(true)}
      />
      <Button
        title="Não"
        onPress={() => handleSubmit(false)}
      />
    </>
  )
}
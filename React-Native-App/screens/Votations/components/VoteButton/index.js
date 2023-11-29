import React, { useContext } from 'react'
import { Button } from 'react-native'
import { AuthContext } from '../../../../context/authContext';
import { API_URL } from '../../../../constants'

export default function VoteButton({ id_sala, id_votado }) {
  const { user } = useContext(AuthContext)

  const handleSubmit = async (voto) => {

    try {
      const res = await fetch(API_URL+"api/votationsScreenAPI/registerVote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           'Authorization': `${user.token || ''}`,
        },
        body: JSON.stringify({
          id_sala: id_sala,
          id_votado: id_votado,
          voto: voto
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
      const res = await fetch(API_URL+"api/votationsScreenAPI/checkVotes", {
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
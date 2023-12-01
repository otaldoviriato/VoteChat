import React, { useContext } from 'react'
import { Button } from 'react-native'
import { AuthContext } from '../../../../context/authContext';
import { API_URL } from '../../../../constants'
import axios from "axios"

export default function VoteButton({ id_sala, id_votado }) {
  const { token } = useContext(AuthContext)

  const request = async (voto) => {
    const url = API_URL + "api/votationsScreenAPI/registerVote"

    const headers = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${token || ''}`
      }
    }
    const body = {
      id_sala: id_sala,
      id_votado: id_votado,
      voto: voto
    }

    await axios.post(url, body, headers)
      .then(async (res) => {
        console.log('Voto computado')
      }).catch((err) => console.error('Error computing vote:', err))
  }

  return (
    <>
      <Button
        title="Sim"
        onPress={() => request(true)}
      />
      <Button
        title="Não"
        onPress={() => request(false)}
      />
    </>
  )
}
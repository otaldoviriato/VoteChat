'use client'

import React from 'react'

export default function yesButton({ salaId, userId }) {

  const handleSubmit = async (e, voto) => {
    e.preventDefault()
    console.log('ok')

    try {
      const res = await fetch("../api/registrarVotos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_sala: salaId,
          id_user: userId,
          voto: voto,
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
  };

  return (
    <>
      <button onClick={(e) => handleSubmit(e, true)}>Sim</button>
      <button onClick={(e) => handleSubmit(e, false)}>Não</button>
    </>
  )
}
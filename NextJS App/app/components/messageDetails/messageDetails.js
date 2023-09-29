'use client'

import React from 'react'

export default function MessageDetails({ user_name, data, fotoPerfil }) {

  function extrairNomeAbreviado(nomeCompleto) {
    // Divida a string pelo espaço em branco para obter partes separadas
    const partesDoNome = nomeCompleto.split(' ');
  
    // Verifique se existem pelo menos duas partes (nome e sobrenome)
    if (partesDoNome.length >= 2) {
      const nome = partesDoNome[0];
      const primeiroSobrenome = partesDoNome[1][0]; // Primeira letra do primeiro sobrenome
  
      return `${nome} ${primeiroSobrenome}.`;
    } else {
      // Se não houver espaço em branco, considere a string inteira como o nome
      return nomeCompleto;
    }
  }

  return (
    <div>
        <div className='flex items-center'>
          {fotoPerfil && (
            <img className='max-h-14 rounded-full' src={fotoPerfil} alt="Foto de Perfil" />
          )}
          <div className='ml-3'>
            <div className='text-cyan-400'>{extrairNomeAbreviado(user_name)}</div>
            <p>{data}</p>
          </div>
        </div>
    </div>
  )
}

'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export default function Logout() {
  const router = useRouter()

  const handleLogout = () => {
    // Remove o cookie de autenticação (ou qualquer outro token de autenticação) aqui
    Cookies.remove('authToken') // Substitua 'authToken' pelo nome do seu cookie de autenticação

    // Redirecione para a página de login ou outra página desejada
    router.push('/login') // Substitua '/login' pelo caminho da página de login
  };

  return (
    <div>
      <h1>Seu conteúdo protegido</h1>
      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}
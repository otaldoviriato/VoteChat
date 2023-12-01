export default async function verifyMember(sala, id_user, token) {

    const membroEncontrado = sala.members && sala.members.find(member => member.id_user && member.id_user.toString() === id_user.toString())
    const pendenteEncontrado = sala.votations && sala.votations.find(votation => votation.actionData === token)

    console.log("pendente encontrado: " + pendenteEncontrado)
    console.log("membro encontrado: " + membroEncontrado)
  
    return !!(membroEncontrado || pendenteEncontrado) // Retorna true se um dos dois for encontrado
  }  
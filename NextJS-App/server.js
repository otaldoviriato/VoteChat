const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const next = require('next')
const mongoose = require('mongoose')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  const httpServer = http.createServer(server)
  const io = new Server(httpServer)

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  io.on('connection', socket => {
    console.log('Cliente conectado ao Socket.io')

    socket.on('message', async (data) => {
      try {
        const salaId = data.id_sala
        const mensagemToDB = {
          conteudo: data.message,
          remetente: data.id_user,
        }

        // Encontra a sala pelo ID e adiciona a mensagem à coleção
        const Salas = require('./models/salas')
        const sala = await Salas.findByIdAndUpdate(
          salaId,
          { $push: { mensagens: mensagemToDB } },
          { new: true }
        )
  
        if (!sala) {
          console.error('Sala não encontrada')
          return
        }

        const User = require('./models/user'); // Suponha que você tenha um modelo de usuário
        const usuario = await User.findById(data.id_user);

        const mensagemToUsers = {
          id: usuario._id,
          name: usuario.name,
          path: usuario.fotoPerfil,
          data: data.message, // Substitua por uma referência ao remetente
        }
  
        // Emita a mensagem para todos os clientes na sala
        io.to(salaId).emit('message', mensagemToUsers)
      } catch (error) {
        console.error('Erro ao salvar mensagem:', error)
      }
    })

    socket.on('join_room', (data) => {
      socket.join(data)
      console.log(`user joined to room: ${data}` )
    })

    socket.on('disconnect', () => {
      console.log('Cliente desconectado do Socket.io')
    })
  })

  const PORT = process.env.PORT || 3000
  httpServer.listen(PORT, () => {
    console.log(`Servidor Next.js está rodando na porta ${PORT}`)
  })
})
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const next = require('next');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  io.on('connection', socket => {
    console.log('Cliente conectado ao Socket.io');

    socket.on('message', async (data) => {

      const id_user = jwt.verify(data.token, process.env.SECRET_KEY)

      try {

        const id_sala = data.id_sala;
        const mensagemToDB = {
          conteudo: data.message,
          remetente: id_user,
        };

        const Salas = require('./models/salas');
        const sala = await Salas.findOneAndUpdate(
          { _id: id_sala },
          { $push: { mensagens: mensagemToDB } },
          { new: true }
        );

        if (!sala) {
          console.error('Sala não encontrada');
          return;
        }

        // Acessar a última mensagem adicionada
        const ultimaMensagem = sala.mensagens[sala.mensagens.length - 1];

        // Buscar informações do usuário no banco de dados
        const User = require('./models/user');
        const userInfo = await User.findById(ultimaMensagem.remetente).exec();

        // Substituir o campo remetente pelo objeto userInfo na mensagem
        ultimaMensagem.remetente = userInfo

        const mensagemToUsers = ultimaMensagem
        console.log(mensagemToUsers)

        // Emitir a mensagem para todos os clientes na sala
        io.to(id_sala).emit('message', mensagemToUsers);

        // Obtém informações sobre os sockets na sala
        const socketsInRoom = io.in(id_sala).sockets;

        // Exibe os IDs dos sockets na sala
        console.log(`Sockets na sala ${id_sala}:`, socketsInRoom ? Object.keys(socketsInRoom) : [])

      } catch (error) {
        console.error('Erro ao salvar mensagem:', error);
      }
    });

    socket.on('join_room', (data) => {
      socket.join(data);
      console.log(`user joined to room: ${data}`);
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado do Socket.io');
    });
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Servidor Next.js está rodando na porta ${PORT}`);
  });
});

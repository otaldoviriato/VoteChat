'use client'

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import MessageDetails from '../messageDetails/messageDetails';

const socket = io();

const SocketComponent = (props) => {
  const [message, setMessage] = useState('');
  const [oldMessages, setOldMessages] = useState(props.dataMessages);
  const messagesContainerRef = useRef(null);

  socket.emit('join_room', props.sala.id);

  useEffect(() => {
    socket.on('message', (message) => {
      // Recebe mensagens do servidor e as adiciona ao estado de mensagens
      console.log(message);
      setOldMessages((prevMessages) => [
        ...prevMessages,
        {
          id: message.id,
          name: message.name,
          path: message.path,
          data: message.data,
        },
      ]);
    });

    return () => {
      socket.off('message');
    }
  }, []);

  useEffect(() => {
    // Rola para a última mensagem quando oldMessages é atualizado
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [oldMessages]);

  // Envia a mensagem para o servidor
  const sendMessage = () => {
    if (message !== '') {
      const messageData = {
        id_sala: props.sala.id,
        id_user: props.user.id,
        message: message,
      };
      socket.emit('message', messageData);
    }
    setMessage(''); // Limpa a mensagem após o envio
  };

  // Função para enviar a mensagem quando a tecla Enter é pressionada
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Evita que a tecla Enter cause quebras de linha no campo de entrada
      sendMessage();
    }
  };

  return (
    <div>
      <div
        ref={messagesContainerRef}
        name="ListaDeMensagens"
        className="h-96 bg-indigo-100 rounded border border-slate-300 overflow-auto"
      >
        {oldMessages.map((msg, index) => (
          <div className="text-indigo-800 text-left m-2" key={index}>
            <MessageDetails
              user_name={msg.name}
              data={msg.data}
              fotoPerfil={msg.path}
            />
          </div>
        ))}
        {/* Div vazia com referência para rolagem no final */}
        <div ref={messagesContainerRef}></div>
      </div>
      <input
        className="text-indigo-800 my-5 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        type="text"
        placeholder="Digite sua mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown} // Chama handleKeyDown quando uma tecla é pressionada
      />
    </div>
  );
};

export default SocketComponent;

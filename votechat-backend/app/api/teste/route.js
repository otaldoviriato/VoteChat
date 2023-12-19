const cron = require('node-cron')

cron.schedule('*/10 * * * * *', () => {
  console.log('Tarefa agendada a cada 10 segundos')
  // Execute a lógica da sua tarefa aqui
})
const main = document.querySelector('main')
const input = document.querySelector('input')
const button = document.querySelector('button')

let currentNick = null

function addMenssage(content, nick, time) {
  main.innerHTML += `
    <div class="message ${currentNick == nick ? 'owner' : ''}">
      <div class="content">${content}</div>
      <div class="nick">${nick}</div>
      <div class= "time">${time}</div>
    </div>
  `
}

const ws = new WebSocket('ws://192.168.120.53:4000')

ws.addEventListener("open", () => console.log('Conectado'))
ws.addEventListener("close", () => console.log('Desconectado'))

ws.addEventListener("message", (event) => {
  const data = JSON.parse(event.data)
  
  addMenssage(data.message, data.nick, data.timestamp)
})

button.addEventListener('click', () => {
  const contend = input.value
  ws.send(contend)
  input.value = ''
})

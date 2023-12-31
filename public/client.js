const socket = io()

let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do{
    name = prompt("Emter Your Name")
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        // console.log("Enter Pressed")
        sendMessage(e.target.value)
    }
})


function sendMessage (message){

    let msg = {
        user:name,
        message:message.trim()
    }

    // Append MEssage
    appendMessage(msg,'outgoing')
    scrollToBottom()
    textarea.value = ''

    socket.emit('message',msg)

}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML= markup;
    messageArea.appendChild(mainDiv)
}


// Recive Messages
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
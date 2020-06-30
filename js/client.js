const socket=io('http://localhost:3000');
const form=document.getElementById('sendform');
const messageinput=document.getElementById('messageinp');
const messagecontainer=document.querySelector('.container');
var Audio=new Audio('ting.mp3');
const append=((message,position)=>{
    const messagelement=document.createElement('div');
    messagelement.innerText=message;
    messagelement.classList.add('message');
    messagelement.classList.add(position);
    messagecontainer.append(messagelement);
    if(position=='left')
    {

        Audio.play();
    }
});
const name=prompt('Enter your name to join the chat');
socket.emit('new-user-joined',name);
socket.on('user-joined',name=>{
   append(`${name} joined the chat`,'right');
});
socket.on('left',name=>{
    append(`${name} left the chat`,'right');
})
socket.on('receive',data=>{
   append(`${data.name}:${data.message}`,'left');
})
form.addEventListener('submit',e=>{
   e.preventDefault();
   append(`You:${messageinput.value}`,'right');
   socket.emit('send',messageinput.value);
   messageinput.value="";

});
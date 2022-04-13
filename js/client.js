var socket = io();

socket.emit('set-pseudo',prompt("Pseudo?"));
var messages = document.getElementById('messages');
var users = document.getElementById('users');
var form = document.getElementById('form');
var input = document.getElementById('input');
form.onsubmit = () => {return false}

form.addEventListener('submit',(e)=>{
    if(input.value !=''){
        socket.emit('emission_message', input.value);
        input.value=""
        
    }
   
});
socket.on('reception_message',(contenu)=>{
    console.log(contenu.pseudo+":"+contenu.message+"\n");
    var item=document.createElement('li');
    item.textContent = contenu.pseudo + " : " + contenu.message;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    
});
socket.on('reception_utilisateur',(e)=>{
    var txt ="";
    e.forEach((item) => {
        txt += "<center>"+item.pseudo_client+"<br></br>"+"</center>"
    });
    users.innerHTML=txt;
});
var id_salon='salon';
var lesMessages = [];

function salon(id){
    console.log(id);
}

function check_unread(){

}


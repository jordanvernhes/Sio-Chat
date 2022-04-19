var socket = io();

id_salon = 'general'
function Salon(id) {
    id_salon = id;
    console.log("le salon a été changer par "+ id);
    messages.innerHTML="";
};

socket.emit('set-pseudo',prompt("Pseudo?"));
var messages = document.getElementById('messages');
var users = document.getElementById('users');
var form = document.getElementById('form');
var input = document.getElementById('input');
form.onsubmit = () => {return false}

form.addEventListener('submit',(e)=>{
    if(input.value !=''){
        socket.emit('emission_message', input.value, id_salon);
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
        txt += "<center><a href=\"#\" onClick=Salon('"+item.id_client+"')>"+item.pseudo_client+"</a><br></br></center>"
    });
    users.innerHTML=txt;
});
const express = require('express');
const app = express ();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var path = require("path");
const { listeners } = require('process');
const { getSystemErrorMap } = require('util');
let PORT = 8080;

server.listen(PORT, ()=>{
    console.log('Server démarré sur le port :'+PORT);
});

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'..', 'index.html'));
});

app.get('/client.js', (req, res)=>{
    res.sendFile(path.join(__dirname,'client.js'));
});
app.get('/style.css', (req, res)=>{
    res.sendFile(path.join(__dirname,'..', 'css/style.css'));
});

io.on('connection', (socket)=>{
    socket.on('set-pseudo',(pseudo)=>{
        console.log(pseudo+" vient de se connecter à "+new Date());
        socket.nickname = pseudo;
        io.fetchSockets().then((room)=>{
            var utilisateurs=[];
            room.forEach((item)=>{
                utilisateurs.push({
                    id_client : item.id,
                    pseudo_client : item.nickname,
                });
            });
            io.emit('reception_utilisateur', utilisateurs );
            console.log(utilisateurs);
        });
        
    });
    socket.on('emission_message',(message , room)=>{
        console.log(socket.nickname+" vient d'écrire :"+message);
        socket.message = message;
        io.emit('reception_message',{
            pseudo: socket.nickname,
            message: socket.message
        });
        io.emit('reception_id_salon',{
            id_salon: room
            
        }); 
    });
    socket.on('disconnect', async ()=>{
        console.log(socket.nickname+" vient de se deconnecter.");
        io.fetchSockets().then((room)=>{
            var utilisateurs=[];
            room.forEach((item)=>{
                utilisateurs.push({
                    id_client : item.id,
                    pseudo_client : item.nickname,
                });
            });
            io.emit('reception_utilisateur', utilisateurs );
        });
    });
    // socket.on('emission_id_salon'),(a)=>{
    //     var idsalonweb="test24";
    //     idsalonweb = id_salon;
    //     consol.log(idsalonweb);
    // };
});
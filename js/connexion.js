form.addEventListener('submit',(e)=>{
    if(input.value !=''){
        socket.emit('connection', input.value);
        input.value=""
        
    }
   
});
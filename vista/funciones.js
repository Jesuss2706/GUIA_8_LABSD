let clienteChat = null;

function setConectado(conectado){
    document.getElementById('btnConectar').disabled = conectado;
    document.getElementById('btnDesconectar').disabled = !conectado;
}

function conectar(){
    const socket = new SockJS('http://localhost:5000/ws');
    clienteChat = Stomp.over(socket);

    clienteChat.connect({}, onConnected);
}

function onConnected(frame){
    console.log("Conectado: " + frame);
    clienteChat.subscribe('/brokerDeReacciones/reaccionesPorCancion', recibirReaccion);
    setConectado(true);
}


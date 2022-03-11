var app = require('express')(); //Creamos una aplicacion Express. para ser de controlador de funciones 
var http = require('http').Server(app); //Modelo HTPP crea un objeto servidor de App que suministra a un servidor HTTP
var io = require('socket.io')(http);//Conectamos el servidor socket al servidor existente (igual que su aplicacion Express)
var port = process.env.PORT || 3000;// Creamos la var Port para asignar el puerto 3000
//SERVIDOR
app.get('/', function(req, res){ //Se define un controlador de rutas "/" que recibe llamadas cuando ingresamos a nuestros sitio web
  res.sendFile(__dirname + '/index.html');//Respuesta enviada por el servidor del archivo HTML
});
app.get('/css/style.css', function(req, res){ //Se define un controlador de rutas "/" que recibe llamadas cuando ingresamos a nuestros sitio web
  res.sendFile(__dirname + '/css/style.css');//Respuesta enviada por el servidor con hojas de estilos 
});
app.get('/images/logo.png', function(req, res){ //Se define un controlador de rutas "/" que recibe llamadas cuando ingresamos a nuestros sitio web
  res.sendFile(__dirname + '/images/logo.png');//Respuesta enviada por el servidor con imagen de Logo UCAB
});
io.on('connection', function(socket){//Se escuchan en el connection de los sockets en los eventos entrantes y el registro en la consola
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);//Nos permite enviar un evento a todos los usuarios conectados al servidor
  });
});

http.listen(port, function(){//Hacemos que el servidor Http escuche por el puerto 3000
  console.log('listening on *:' + port);
});

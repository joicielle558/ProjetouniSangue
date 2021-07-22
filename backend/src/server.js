const express = require('express');
const routes = require('./routes');
const mongoose = require ('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

//conexão do Djenole com o MongoDB, minha conexao e informações nao rodou.
mongoose.connect('mongodb+srv://djenoleReis:djenole123456@cluster0.m4p4y.mongodb.net/DadosUniSangue?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})



//variável criada temporariamente para armazenar 
//os usuários conectados

const connectedUsers = {};

io.on('connection', socket => {
 //   console.log(socket.handshake.query);
//    console.log('conectado', socket.id);
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;

});


// O io é a parte que recebe ou envia mensagens para dentro do frontend ou mobile
//como o io está sendo adicionado dentro do req e as rotas do bookingController também tem acesso ao req,
// é possível buscar o req.io dentro do bookingController
//permitindo ter acesso ao protocolo de comunicação do frontend

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
    // dessa forma todas as rotas da aplicação já tem acesso
    // ao io e aos usuarios conectados na aplicação
    // e o next é para continuar a aplicação
    


})

//GET, POST, PUT, DELETE

//req.query = acessar query params (criação de filtro)
//req.params = acessar riyte params (edicao e delete)
//req.body = acessar corpo da requisiçao( criação e edição de registros)

app.use(cors());
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);


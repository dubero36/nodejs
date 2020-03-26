const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// namespace 1번
const namespace1 = io.of('/namespace1');
// connection 을 받으면 news 이벤트에 hello 객체를 담아 보낸다
namespace1.on('connection', (socket) => {
    namespace1.emit('news', {hello: 'Someone connected at namespace1'});
});

// namespace 1번
const namespace2 = io.of('/namespace2');
// connection 을 받으면 news 이벤트에 hello 객체를 담아 보낸다
namespace2.on('connection', (socket) => {
    namespace2.emit('news', {hello: 'Someone connected at namespace2'});
});

/*
io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    });
});
*/

server.listen(3000, ()=>{
    console.log('Connected at 3000');
});
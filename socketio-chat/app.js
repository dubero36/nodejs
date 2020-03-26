var app = require('express')();
var server = require('http').createServer(app);
// http 서버를 socket.io 서버로 업그레이드
var io = require('socket.io')(server);

// 서버 접속시 index.html 전송
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// connection 수립시 event handler function 인자로 socket 이 들어옴
// io 객체는 연결된 전체 클라이언트와의 interacting 을 위한 객체
// socket 객체는 개별 클라이언트와의 interacting 을 위한 객체
io.on('connection', function(socket){
    console.log("New socket.id: " + socket.id);

    // 접속한 클라이언트로부터 정보가 수신되면
    socket.on('login', function(data){
        console.log('Client logged-in:\n name: ' + data.name + '\n userid: ' + data.userid);
        // socket 에 클라이언트 정보 저장
        socket.name = data.name;
        socket.userid = data.userid;
        // 접속한 모든 클라이언트에게 메시지를 전송
        io.emit('login', data.name);
    });

    // 클라인언트로부터 메시지가 수신되면
    socket.on('chat', function(data){
        console.log('Message from %s: %s', socket.name, data.msg);

        var msg = {
            from: {
                name: socket.name,
                userid: socket.userid
            },
            msg: data.msg
        };

        // 메세지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지 전송
        socket.broadcast.emit('chat', msg);

        // room name 안 나를  제외한 다른 클라이언트들에게 이벤트 보내기
        //socket.broadcast.to('room name').emit('event name', message);

        // 메세지를 전송한 클라이언트에게만 메시지를 전송 1:1
        //socket.emit('s2c chat', msg);        

        // 접속한 모든 클라이언트에게 메시지를 전송
        //io.emit('s2c chat', msg);

        // 특정 클라이언트에게만 메시지 전송
        //io.to(id).emit('s2c chat', data);

        // room name 안 모든 클라이언트들에게 이벤트 보내기
        //io.sockets.in('room name').emit('event name', message);

        // 현재 생성되어 있는 모든 room 목록 리턴
        //io.sockets.manager.rooms

        // room 안에 있는 모든 클라이언트 소켓 목록을 리턴
        //io.sockets.clients('room name')

    });

    // force client disconnect from server
    socket.on('forceDisconnect', function(){
        console.log('user forceDisconnect: ' + socket.name);
        socket.disconnect();
    });

    socket.on('disconnect', function(){
        console.log('user disconnected: ' + socket.name);
    });
});

server.listen(3000, function(){
    console.log('Socket IO server listening on port 3000');
});
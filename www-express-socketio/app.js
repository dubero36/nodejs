var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRouter = require('./routes/chat');
var uploadRouter = require('./routes/upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);
app.use('/upload', uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('err: ' + err);
  console.log('env: ' + req.app.get('evn'));
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*** Socket.IO 추가 ***/
app.io = require('socket.io')();

var socket_ids = {};
var rooms = [];
var count = 0;

app.io.on('connection', function(socket){

  socket.on('joinroom', function(data){
    socket.join(data.room);
    socket.room = data.room;
    var room = data.room;
    var nickname = '손님-'+count;
    socket.nickname = nickname;
    socket.emit('new', {nickname: nickname});
    //create room
    if(rooms[room] == undefined) {
      console.log('room create : ' + room);
      rooms[room] = new Object();
      rooms[room].socket_ids = new Object();
    }
    // 현재 접속자 추가
    rooms[room].socket_ids[nickname] = socket.id;
    // room 에 broadcast
    data = {msg: nickname + ' 님이 입장하셨습니다.'};
    app.io.sockets.in(room).emit('broadcast_msg', data);
    app.io.sockets.in(room).emit('userlist', {users: Object.keys(rooms[room].socket_ids)});
    count++;
  });

  socket.on('changename', function(data){
    var room = socket.room;
    var pre_nick = socket.nickname;
    if(room != undefined && rooms[room] != undefined){            
      if(pre_nick != undefined){        
        delete rooms[room].socket_ids[pre_nick];
        rooms[socket.room].socket_ids[data.nickname] = socket.id;
        socket.nickname = data.nickname;
        data = {msg: pre_nick + ' 님이 ' + data.nickname + '으로 대화명을 변경하셨습니다.'};
        app.io.sockets.in(room).emit('broadcast_msg', data);
        app.io.sockets.in(room).emit('userlist', {users: Object.keys(rooms[room].socket_ids)});
      }
    }
  });

  socket.on('disconnect', function(data){
    var room = socket.room;
    var nickname = socket.nickname;
    if(room != undefined && rooms[room] != undefined){
      if(nickname != undefined 
        && rooms[room].socket_ids != undefined
        && rooms[room].socket_ids[nickname] != undefined)  delete rooms[room].socket_ids[nickname];
      data = {msg: nickname + ' 님이 나가셨습니다.'};
      app.io.sockets.in(room).emit('broadcast_msg', data);
      app.io.sockets.in(room).emit('userlist', {users: Object.keys(rooms[room].socket_ids)});
    }
  });

  socket.on('send_msg', function(data){
    var room = socket.room;
    var nickname = socket.nickname;
    console.log('in send msg room is ' + room);
    data.msg = nickname + ' : ' + data.msg;
    if(data.to == 'ALL') {
      // 자신제외 
      socket.broadcast.to(room).emit('broadcast_msg',data);
    } else {
      to_id = rooms[room].socket_ids[data.to];
      if(to_id != undefined){
        app.io.to(to_id).emit('broadcast_msg',data);
      }
    }
    socket.emit('broadcast_msg', data);
  });

});

// start of  1:1 채팅
/*
app.io.on('connection', function(socket){
  
  var new_nick = 'GUEST-'+count;
  socket.emit('new', {nickname: new_nick});
  registerUser(socket, new_nick);
  
  socket.on('changename', function(data){
    registerUser(socket, data.nickname);
  });

  socket.on('disconnect', function(data){
    unRegisterUser(socket);
    app.io.emit('userlist', {users: Object.keys(socket_ids)});
  });

  socket.on('send_msg', function(data){
    data.msg = socket.nickname + ' : ' + data.msg;
    console.log(data);
    if(data.to == 'ALL') {
      socket.broadcast.emit('broadcast_msg',data);
    } else {
      to_id = socket_ids[data.to];
      if(to_id != undefined){
        app.io.to(to_id).emit('broadcast_msg',data);
      }
    }
    socket.emit('broadcast_msg', data);
  });
});

// 신규등록 및 닉네임 변경 처리
function registerUser(socket, nickname){ 
  // 기존 닉네임 삭제처리(닉네임 변경시)
  unRegisterUser(socket);

  // 새로운 닉네임 등록
  socket_ids[nickname] = socket.id;
  socket.nickname = nickname;
  app.io.emit('userlist', {users: Object.keys(socket_ids)});
  count++;

  //console.log('user list: ' + Object.keys(socket_ids));
  console.log('user list: ' + JSON.stringify(socket_ids));
  console.log('user count: ' + Object.keys(socket_ids).length);
  
}

// 닉네임 삭제
function unRegisterUser(socket){
  if(socket.nickname != undefined) {
    delete socket_ids[socket.nickname];
  }
}
*/
// end of  1:1 채팅

/* 
app.io.on('connection', function(socket){
  console.log('a user connected');
  socket.broadcast.emit('hi');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    app.io.emit('chat message', msg);
  });
});
 */

module.exports = app;

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    if (msg.trim().length > 0 && msg.trim().length < 361) {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    }
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(app.get('port'), function(){
  console.log('listening on *:' + app.get('port'));
});

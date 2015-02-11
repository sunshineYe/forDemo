// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

var progress = 0, si;
io.on('connection', function (socket) {
  // 接收启动信号
  socket.on('start upload', function() {
    console.log('start');
    // 发出进度信号
    si = setInterval(function() {
      socket.emit('progress update', {
        progress: progress++
      });
    }, 1000);
  });

  // 接收结束信号
  socket.on('stop upload', function () {
    clearInterval('stop');
    clearInterval(si);
    console.log(si);
    progress = 0;
  });
});

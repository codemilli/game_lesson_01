/**
 * Created by hckrmoon on 7/9/17.
 */

var blobs = [];

for(var i = 0; i < 250; i++) {
  blobs[i] = {
    x: parseInt(Math.random() * 2000) - 1000,
    y: parseInt(Math.random() * 2000) - 1000,
    r: 15
  };
}

function Blob(id, x, y, r) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.r = r;
}

var express = require('express');
var app = express();

var server = app.listen(3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('server running at http://' + host + ':' + port);
}

app.use(express.static('public'));

var io = require('socket.io')(server);

setInterval(heartbeat, 16);

function heartbeat() {
  io.sockets.emit('heartbeat', blobs);
}

io.sockets.on('connection', function (socket) {
  console.log('we have a new client: ' + socket.id);

  socket.on('start', function (data) {
    console.log('on start ', data.x + ' ' + data.y + ' ' + data.r);

    var blob = new Blob(socket.id, data.x, data.y, data.r);
    blobs.push(blob);
  });
  
  socket.on('update', function (data) {
    var blob = new Blob(socket.id, data.x, data.y, data.r);
    
    blobs.forEach(function (b, idx) {
      if (socket.id === b.id) {
        blobs[idx] = blob;
      }
    });
  });

  socket.on('disconnect', function () {
    blobs = blobs.filter(function (b) {
      return b.id !== socket.id;
    });
  })
});

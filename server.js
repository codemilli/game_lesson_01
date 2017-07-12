/**
 * Created by hckrmoon on 7/9/17.
 */

var blobs = [];
var users = [];


for(var i = 0; i < 250; i++) {
  blobs[i] = {
    b_id: parseInt(Math.random() * 999999),
    x: parseInt(Math.random() * 2000) - 1000,
    y: parseInt(Math.random() * 2000) - 1000,
    r: 4
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
  io.sockets.emit('heartbeat', users);
}

io.sockets.on('connection', function (socket) {
  console.log('we have a new client: ' + socket.id);

  socket.on('start', function (data) {
    console.log('on start ', data.x + ' ' + data.y + ' ' + data.r);

    var blob = new Blob(socket.id, data.x, data.y, data.r);
    users.push(blob);

    socket.emit('blobs.changes', blobs);
  });
  
  socket.on('update', function (data) {
    var blob = new Blob(socket.id, data.x, data.y, data.r);
    
    users.forEach(function (b, idx) {
      if (socket.id === b.id) {
        users[idx] = blob;
      }
    });
  });

  socket.on('eating', function(data) {
    blobs = blobs.filter(function(b) {
      if (b.b_id === data.b_id) {
        socket.emit('ate', data);
        return false;
      }
      return true;
    });

    if (blobs.length < 50) {  
      console.log('extra blobs should be recharged');

      var newBlobs = [];
      for (var i = 0; i < 35; i++) {
        newBlobs.push({
          b_id: parseInt(Math.random() * 999999),
          x: parseInt(Math.random() * 2000) - 1000,
          y: parseInt(Math.random() * 2000) - 1000,
          r: 4
        });
      }

      blobs = blobs.concat(newBlobs);
    }

    io.sockets.emit('blobs.changes', blobs);
  });

  socket.on('disconnect', function () {
    users = users.filter(function (u) {
      return u.id !== socket.id;
    });
  })
});

/**
 * Created by hckrmoon on 7/9/17.
 */

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

io.sockets.on('connection', function (socket) {
  console.log('we have a new client: ' + socket.id);
});
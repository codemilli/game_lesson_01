var socket;
var blob;
var blobs = [];
var zoom = 1;

var _canvasWidth = 1000;
var _canvasHeight = 1000;

/**
 * Setup for drawing
 */
function setup() {
    createCanvas(_canvasWidth, _canvasHeight);
    background(0);

    socket = io.connect(location.origin);

    blob = new Blob(0, 0, 32);
    var data = {
        x: blob.pos.x,
        y: blob.pos.y,
        r: blob.r
    };

    socket.emit('start', data);

    socket.on('heartbeat', function (data) {
        blobs = data;
    });
}

/**
 * Drawing function called 60 times per 1sec.
 */
function draw() {
    background(0);

    var newZoom = 32 / blob.r;
    zoom = lerp(zoom, newZoom, 0.1);
    translate(width / 2, height / 2);
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y);

    blobs.forEach(function (b, idx) {

        if (b.id !== socket.id) {

            if (b.id) {
                fill(0, 0, 255);
                ellipse(b.x, b.y, b.r * 2, b.r * 2);

                fill(255);
                textAlign(CENTER);
                textSize(9);
                text(b.id, b.x, b.y + b.r + 2);
            } else {
                fill(255, 0, 0);
                ellipse(b.x, b.y, b.r * 2, b.r * 2);
            }
        }
    });

    blobs.forEach(function (b) {
      if (blob.eats(b)) {
          console.log('eat');
      }
    });

    blob.update();
    blob.show();
    blob.constrain();

    socket.emit('update', {
        x: blob.pos.x,
        y: blob.pos.y,
        r: blob.r
    });
}

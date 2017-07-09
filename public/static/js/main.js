var socket;
var blob;
var blobs = [];
var zoom = 1;

/**
 * Setup for drawing
 */
function setup() {
    createCanvas(600, 600);
    background(0);

    socket = io.connect('http://localhost:3000');

    blob = new Blob(0, 0, 64);
    var data = {
        x: blob.pos.x,
        y: blob.pos.y,
        r: blob.r
    };

    socket.emit('start', data);

    socket.on('heartbeat', function (data) {
        console.log('heartbeat', data);
    });
}

/**
 * Drawing function called 60 times per 1sec.
 */
function draw() {
    background(0);

    var newZoom = 64 / blob.r;
    zoom = lerp(zoom, newZoom, 0.1);
    translate(width / 2, height / 2);
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y);

    blobs = blobs.filter(function (b, idx) {
        if (blob.eats(b)) {
            return false;
        } else {
            b.show();
            return true;
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
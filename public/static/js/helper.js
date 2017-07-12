var eatingBlobList = {};

function Blob(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.x = x;
    this.y = y;
    this.vel = createVector(0, 0);
}

Blob.prototype.update = function() {
    var newVel = createVector(mouseX - width / 2, mouseY - height / 2);
    newVel.setMag(5);

    this.vel.lerp(newVel, 0.1);
    this.pos.add(this.vel);
};

Blob.prototype.eats = function (other) {
    var d = p5.Vector.dist(this.pos, (new Blob(other.x, other.y, other.r)).pos);

    if ((d < this.r + other.r) && eatingBlobList[other.b_id] !== 'eating') {
        eatingBlobList[other.b_id] = 'eating';
        return true;
    }

    return false;
};

Blob.prototype.ate = function (other) {
    this.r += other.r / 7;
};

Blob.prototype.show = function() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);

    fill(255);
    textAlign(CENTER);
    textSize(12);
    text(('x: ' + parseInt(this.pos.x) + ' y: ' + parseInt(this.pos.y)), this.pos.x, this.pos.y + this.r + 12);
};

Blob.prototype.constrain = function() {
  this.pos.x = constrain(this.pos.x, -width, width);
  this.pos.y = constrain(this.pos.y, -height, height);
};
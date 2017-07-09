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
    var d = p5.Vector.dist(this.pos, other.pos);

    if (d < this.r + other.r) {
        this.r += other.r / 10;
        return true;
    }

    return false;
};

Blob.prototype.show = function() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
};

Blob.prototype.constrain = function() {
  this.pos.x = constrain(this.pos.x, -width, width);
  this.pos.y = constrain(this.pos.y, -height, height);
};
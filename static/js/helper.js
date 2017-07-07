function Blob(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.x = x;
    this.y = y;
}

Blob.prototype.update = function() {
    var vel = createVector(mouseX, mouseY);
    vel.sub(this.pos);
    vel.setMag(3);
    this.pos.add(vel);
}

Blob.prototype.show = function() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
}
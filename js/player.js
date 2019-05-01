function Player() {
    // variables to use in game, no actual functions ig bc im lazy and can do it without them here
    // could use class, but lmao heck classes
    this.tail = 1;
    this.trail = [];
    this.xv;
    this.yv;
    this.x;
    this.y;
    this.moveLeft = function() {
        this.xv = -1;
        this.yv = 0;
    };
    this.moveRight = function() {
        this.xv = 1;
        this.yv = 0;
    };
    this.moveUp = function() {
        this.xv = 0;
        this.yv = -1;
    };
    this.moveDown = function() {
        this.xv = 0;
        this.yv = 1;
    };
}



// VARIABLES
// --------------------------------
// --------------------------------
var p = new Player();                       // I declared the player constructor function in player.js
var a = new Apple();                          // make the item to pick up (apple)
var highScore = 0;                            // initialize the highscore
var speed = 12;                               // twelve seems to be good sped
var appleColor = "#d63031";                   // color of item to pick up
var pageColor = '#dcdde1';                    // color of page background
var backgroundColor = "#ffda79";              // color of game background
var playerColor = "#009432";                   // color of player
var size = 20;                                // size of entire world
var deaths = 0;                               // deathcount
start(); // all other values that I don't want to write more than once

window.onload = function() {
    canv = document.getElementById("canvas");
    c = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
};


// ANIMATION
// --------------------------------
// --------------------------------

function draw() {

    // to set highscore variable
    if(p.tail-1>highScore) {
        highScore = p.tail -1;
    }

    // to start the player in the directions by arrow keys ig
    p.x += p.xv;
    p.y += p.yv;

    // to deal with the wall collisions
    walls();

    // to draw background
    background(backgroundColor);

    // to draw player
    c.fillStyle = playerColor;
    for (var i = 0; i < p.trail.length; i++) {
        c.fillRect(p.trail[i].x * gs, p.trail[i].y * gs, gs - 2, gs - 2);
        if (p.trail[i].x == p.x && p.trail[i].y == p.y && document.getElementById("score").innerHTML != 0) {
            init();
        }
    }
    p.trail.push({
        x: p.x,
        y: p.y
    });
    while (p.trail.length > p.tail) {
        p.trail.shift();
    }


    // to draw apple
    if (a.x == p.x && a.y == p.y) {
        p.tail++;
        a.move();
    }
    a.draw();

    // update score? lmao
    updateScore();
}

// FUNCTIONS
// --------------------------------
// --------------------------------

// update score
function updateScore() {
    document.getElementById("score").innerHTML = p.tail - 1;
}

// handle keypresses
function keyPush(evt) {
    switch (evt.keyCode) {
        case 37:
            p.moveLeft();
            break;
        case 38:
            p.moveUp();
            break;
        case 39:
            p.moveRight();
            break;
        case 40:
            p.moveDown();
            break;
    }
}

// handling wall collision
function walls() {
    if (p.x < 0) {
        p.x = tc - 1;
    }
    else if (p.x > tc - 1) {
        p.x = 0;
    }
    else if (p.y < 0) {
        p.y = tc - 1;
    }
    else if (p.y > tc - 1) {
        p.y = 0;
    }
}

// changing background color
function background(cc) {
    c.fillStyle = cc;
    c.fillRect(0, 0, canv.width, canv.height);
}
// for animation
var gameTime;
function run() {
    gameTime = setInterval(draw, 1000 / speed);
    hideMenu();
    show();
}

// like the init function but is used throughout the program once more
function start() {
    p.x = p.y = 10; // player starting point
    gs = tc = size; // boundaries of world
    a.x = a.y = 15; // initialize apple coords
    p.xv = p.yv = 0; // player starting velocity
    p.trail = [];       // just the head exists
    p.tail = 1;         // ^
}

// stop the game if it was going, then reinitialize all values (except of course the highscore and death count)
function init() {

    // stop game
    clearInterval(gameTime);
    
    // initialize values
    start();

    // up the death count (bc this function is used when the player dies)
    deaths++;

    // show the try again? thing
    document.querySelector("a").innerHTML = "Try again? <br><br> Deaths: " + deaths + "<br> Highscore: " + highScore;
    showMenu();

    // change background
    c.fillStyle = pageColor;
    c.fillRect(0, 0, canv.width, canv.height);
}
function mask() {
    c.fillSTyle = pageColor;
    c.fillRect(a.x * gs, a.y * gs, gs - 2, gs - 2);
}
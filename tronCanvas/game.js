var gameOver = false;
var whichPlayerLost = 0;

var players = [];

const diff = 10;

function setup(){
    createCanvas(500, 500);
    frameRate(15);
    stroke(255);
    strokeWeight(10)

    players[0] = new Lightbike(0, 0);
    players[0].dir = 'right';
    players[0].myColor = color(255, 0, 0);
    players[0].playerID = 1;

    players[1] = new Lightbike(width - diff, width - diff);
    players[1].dir = 'left';
    players[1].myColor = color(50, 50, 255);
    players[1].playerID = 2;
}
function draw(){
    background(0);
    if (!gameOver) {
        // run player 1 methods
        players[0].update(); // move
        players[0].show(); // display
        players[0].otherHit(1); // did i hit the other?
        players[0].selfHit(); // did i hit myself?

        // run player 2 methods
        players[1].update();
        players[1].show();
        players[1].selfHit();
        players[1].otherHit(0); // check if you hit player 0 (player 1)

    } else {
        // game is over, who lost?
        if (whichPlayerLost == 1) {
            fill(255, 255, 0);
            text("Player 2 is victorious!", width / 2, height / 2);
        } else {
            fill(255, 255, 0);
            text("Player 1 is victorious!", width / 2, height / 2);
        }
    }
}
function keyPressed() {
  switch (keyCode) {
    case 37:
      if (players[0].dir !== 'right') {
        players[0].dir = 'left';
      }
      break;
    case 39:
      if (players[0].dir !== 'left') {
        players[0].dir = 'right';
      }
      break;
    case 38:
      if (players[0].dir !== 'down') {
        players[0].dir = 'up';
      }
      break;
    case 40:
      if (players[0].dir !== 'up') {
        players[0].dir = 'down';
      }
      break;
  }
}

function Lightbike(spawnX, spawnY) {
    this.x = spawnX; // where am i?
    this.y = spawnY;
    this.dir = 'right';
    this.total = 0; // how many segments do i have?
    this.trail = []; // keep track of all my segments

    this.myColor = color(255); // what color am i?
    this.playerID; // which player am i?

    // did i hit my own trail, should i be dead?
    this.selfHit = function () {
        // run thru all my segments, DID I KILL MYSELF?
        for (var i = 0; i < this.trail.length; i++) {
            // trail[] is a vector, meaning a variable type
            // with an x and a y

            // were checking the vector for each trail segment
            var pos = this.trail[i];

            // am i on top of another segment?
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                // if so, player 2 wins.
                gameOver = true;
                whichPlayerLost = this.playerID;
            }
        }
    }

    this.otherHit = function (otherID) {
        // run thru all other player segments, DID THEY KILL ME?
        for (var i = 0; i < players[otherID].trail.length; i++) {

            var tailPos = players[otherID].trail[i];

            // am i on top of another segment?
            var d = dist(tailPos.x, tailPos.y, this.x, this.y);

            if (d < 1) {
                // if so, player 2 wins.
                gameOver = true;
                whichPlayerLost = this.playerID;
            }
        }
    }
    this.update = function () {
        // every frame add a new trail part
        this.total++;

        // you need to constantly move old trail parts to the back
        // of the array
        if (this.total === this.trail.length) {
            for (var i = 0; i < this.trail.length - 1; i++) {
                this.trail[i] = this.trail[i + 1];
            }
        }
        this.trail[this.total - 1] = createVector(this.x, this.y);

        // move along the grid
        if(this.dir == 'right')
            this.x = this.x + 1 * diff;
        if(this.dir == 'left')
            this.x = this.x - 1 * diff;
        if(this.dir == 'up')
            this.y = this.y - 1 * diff;
        if(this.dir == 'down')
            this.y = this.y + 1 * diff;

        this.x = constrain(this.x, 0, width - diff);
        this.y = constrain(this.y, 0, height - diff);
    }

    this.show = function () {
        fill(this.myColor);
        noStroke();
        // draw each segment of trail
        for (var i = 0; i < this.trail.length; i++) {
            rect(this.trail[i].x, this.trail[i].y, diff, diff);
        }
        rect(this.x, this.y, diff, diff);
    }
}
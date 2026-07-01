



let cubes;
let gameState = 'playing';
let lives = 1;
var score = 0;
function setup() {
  console.log("setup: fffffgfgggfggfgffggfg ");
  console.log("setup: dasdasfefsef");
  cnv = new Canvas(1390, 900);

  // timers for the up and space//
  var time = 3
  // the cube that the player uses and the floor of the game//
  cube = new Sprite(width - 1300, 600, 40, 40, 'd');
  cube.color = 'blue';
  cube.friction = 0;
  floor = new Sprite(width / 2, 700, 1390, 40, 'k');
  floor.color = 'cyan';

  //BLock that the cube can die on//
  for (i = 0; i < 1; i++) {
    spikesGroup = new Group();

    spikes = new Sprite(900, 665, 10, 30, 'k');
    spikes.color = 'red';
    spikes.vel.x = -3;
    spikesGroup.add(spikes);

    spikes = new Sprite(950, 665, 10, 30, 'k');
    spikes.color = 'red';
    spikes.vel.x = -3;
    spikesGroup.add(spikes);

    spikes = new Sprite(1400, 665, 10, 30, 'k');
    spikes.color = 'red';
    spikes.vel.x = -3;
    spikesGroup.add(spikes);

    spikes = new Sprite(2100, 555, 10, 30, 'k');
    spikes.color = 'red';
    spikes.vel.x = -3;
    spikesGroup.add(spikes);

    spikes = new Sprite(2600, 555, 10, 30, 'k');
    spikes.color = 'red';
    spikes.vel.x = -3;
    spikesGroup.add(spikes);

    spikes = new Sprite(3200, 555, 10, 30, 'k');
    spikes.color = 'red';
    spikes.vel.x = -3;
    spikesGroup.add(spikes);

    spikes = new Sprite(3600, 665, 10, 30, 'k');
    spikes.color = 'red';
    spikes.vel.x = -3;
    spikesGroup.add(spikes);

    spikes = new Sprite(4500, 665, 10, 30, 'k');
    spikes.color = 'red';
    spikes.vel.x = -3;
    spikesGroup.add(spikes);

    spikes = new Sprite(5000, 665, 10, 30, 'k');
    spikes.color = 'red';
    spikes.vel.x = -3;
    spikesGroup.add(spikes);

    spikes = new Sprite(7500, 665, 10, 30, 'k');
    spikes.color = 'red';
    spikes.vel.x = -3;
    spikesGroup.add(spikes);

    spikes = new Sprite(9500, 665, 10, 30, 'k');
    spikes.color = 'red';
    spikes.vel.x = -3;
    spikesGroup.add(spikes);

    spikes = new Sprite(10000, 665, 10, 30, 'k');
    spikes.color = 'red';
    spikes.vel.x = -3;
    spikesGroup.add(spikes);

    spikes = new Sprite(11500, 665, 10, 30, 'k');
    spikes.color = 'red';
    spikes.vel.x = -3;
    spikesGroup.add(spikes);

    spikes = new Sprite(13500, 665, 10, 30, 'k');
    spikes.color = 'red';
    spikes.vel.x = -3;
    spikesGroup.add(spikes);

    spikes.friction = 0;
    spikesGroup.collides(cube, func2Call);

  }



  console.log("setup: dghgnngndgfjgngjfn");
  //blocks that the cube can stand on//
  block = new Sprite(1520, 660, 40, 40, 'k');
  block.color = 'pink';
  block.vel.x = -3;

  block = new Sprite(1560, 660, 40, 40, 'k');
  block.color = 'pink';
  block.vel.x = -3;

  block = new Sprite(1600, 640, 40, 80, 'k');
  block.color = 'pink';
  block.vel.x = -3;

  block = new Sprite(1640, 620, 40, 40, 'k');
  block.color = 'pink';
  block.vel.x = -3;

  block = new Sprite(1680, 620, 40, 40, 'k');
  block.color = 'pink';
  block.vel.x = -3;

  block = new Sprite(2000, 540, 40, 40, 'k');
  block.color = 'pink';
  block.vel.x = -3;

  block = new Sprite(2120, 500, 40, 40, 'k');
  block.color = 'pink';
  block.vel.x = -3;

  block = new Sprite(2450, 580, 1500, 40, 'k');
  block.color = 'pink';
  block.vel.x = -3;

 
  block = new Sprite(3500, 660, 40, 40, 'k');
  block.color = 'pink';
  block.vel.x = -3;

  block = new Sprite(4000, 660, 40, 40, 'k');
  block.color = 'pink';
  block.vel.x = -3;


  block = new Sprite(5000, 660, 100, 40, 'k');
  block.color = 'pink';
  block.vel.x = -3;


  
  block = new Sprite(6500, 660, 40, 40, 'k');
  block.color = 'pink';
  block.vel.x = -3;

  block = new Sprite(7000, 660, 40, 40, 'k');
  block.color = 'pink';
  block.vel.x = -3;

  block = new Sprite(8000, 660, 40, 40, 'k');
  block.color = 'pink';
  block.vel.x = -3;

  block = new Sprite(8500, 660, 200, 40, 'k');
  block.color = 'pink';
  block.vel.x = -3;

 

  block = new Sprite(11000, 660, 40, 80, 'k');
  block.color = 'pink';
  block.vel.x = -3;
  
  block = new Sprite(12500, 660, 40, 40, 'k');
  block.color = 'pink';
  block.vel.x = -3;

  block = new Sprite(13000, 660, 40, 40, 'k');
  block.color = 'pink';
  block.vel.x = -3;

  block.friction = 0;

  //the progress bar and dhdghdjghdfhgdfjhdthe numbers that you see how far you have gone//
  progressbar = new Sprite(width / 2, 30, 800, 50, 'k');
  progressbar.color = 'lightgreen';

  progress = new Sprite(width / 2, 30, 800, 50, 'k');
  progress.color = 'black';

  //gravity//
  world.gravity.y = 10;




}
function draw() {
  background('green');

   if (cube.colliding(block)) {
    if (cube.x < block.x - 10) { 
        func2Call(); 
    }
  }
  if (cube.x < 0) {
    showdeathscreen();
  }

  if (kb.pressing('up')) {
    if (Math.abs(cube.vel.y) < 0.01) {
      cube.vel.y = -7
       cube.rotationSpeed = 5;
    }
  } else if (kb.released('up')) {
    if (Math.abs(cube.vel.y) < 0.01) {
      cube.vel.y = +1
       cube.rotationSpeed = 0; 
    cube.rotation = Math.round(cube.rotation / 90) * 90;
    }
  }

  if (cube >= block, spikes) {
    if (cube.vel.x = ('0')) {
      progress.vel.x = +0.100
      progress.width = progress.width - 0.200
    }
  }

  if (progress.vel.x > 0) {
    score = score + 0.025;
  }
  text('' + score, 235, 20, 50);
  textSize(30);

  if (score > 100) {
    showendscreen()
  }

  for (i = 0; i < lives; i++) {
    rect(50 * i, 50, 55, 55);

  }
}




function func2Call(cube, spikes) {
  console.log("setup:oww ");
  if (cube.collides, spikes) {
    lives--;
  }
  if (lives = '0') {
    showdeathscreen();
  }
}

function showendscreen() {
  fill(0);
  textSize(50);
  text("Level Finished! Score: " + Math.floor(score), width / 2 - 200, height / 2);
  noLoop();
  //data base code in here//
firebase.database().ref(login/users/${Jumpdashscore}/+score).set();
}

function keyPressed() {
  if (key === 'p' || key === 'P') {
    if (gameState === 'playing') {
      gameState = 'paused';
      noLoop();
    } else if (gameState === 'paused') {
      gameState = 'playing';
      loop();
    }
  }
}


function showdeathscreen() {
  fill(0);
  textSize(100);
  text("You Died Score: " + Math.floor(score), width / 2 - 150, height / 2);
  noLoop();
firebase.database().ref(login/users/${Jumpdashscore}/ + score).set();
}
//for the levels beaten function and it saves the score to the user//


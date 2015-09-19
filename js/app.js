// A score variable
var score = 0;

// Enemies our player must avoid
var Enemy = function(y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = y;
    this.speed = speed;
    this.boxHeight = 60;
    this.boxWidth = 70;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //this.t represents the value to be added to position x in order to move the enemy
    this.t = this.speed * dt;
    this.x = this.x + this.t;
    this.collision(player);
}

//Creates a box around the character for collision detection 

// Draw the enemy on the screen, required method for game. Within this prototype function an extra enemy is added when the score is equal to 2
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.x>ctx.canvas.width){
        this.x=-161;
    }
    if (allEnemies.length===2 && score===2){
      var bug3 = new Enemy(100,50);
      allEnemies.push(bug3);
    }
}

//This function will detect collisions between the character and bugs. If a collision is detected the character will be reset to its original position
//Secondly the score will be deducted. 

Enemy.prototype.collision = function(player){
        if (this.x < player.x + player.boxWidth && this.x + this.boxWidth > player.x && this.y < player.y + player.boxHeight && this.boxHeight + this.y > player.y){
            player.x=202;
            player.y=400;
            score--;
            if (score<0){
              alert("Game Over");
              location.reload();
            }
        }
    }

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Hero = function(x,y,speed){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.speed=speed;
    this.boxHeight = 60;
    this.boxWidth = 70;
}

//Function used to reset your character to the original position
Hero.prototype.reset = function(){
  this.x=202;
  this.y=400;
}

//The Hero render function draws the character. The first 2 IF statements checks the boundaries.
//.dimension takes the current box around the character for collision detection.
Hero.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.x>422 || this.x<0){
        this.reset();
    }
    if (this.y>400){
        this.reset();
    }
    if (this.y<50){
        this.reset();
        score++;}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var bug1 = new Enemy(100,20);
allEnemies.push(bug1);

var bug2 = new Enemy(200,40);
allEnemies.push(bug2);


//Instantiate the player object
var player  = new Hero(202,400,0);

//This variable stores all radio inputs from the HTML code
var radios = document.getElementsByName("characters");

//Provides the user the ability to change the default character. The loop adds an eventListener to all input radios and runs the changeCharacter function
//If not character is selected the default boy character will be loaded via the Class Hero. 
Hero.prototype.changeCharacter = function(event){

  if(event.target.value=="boy1"){
    player.sprite = 'images/char-boy.png';
  }else if (event.target.value=="girl1"){
    player.sprite = 'images/char-cat-girl.png';
  } else if (event.target.value=="girl2"){
    player.sprite = 'images/char-horn-girl.png';
  }
  }

//The for loop loops through the radios and attaches eventListeners 
for (var i=0; i<radios.length;i++){
  radios[i].addEventListener("change",player.changeCharacter);
}

// HandleInput moves the character accoring to the arrow keys pressed. 
Hero.prototype.handleInput = function(keys){
  if (keys==='up'){
    this.y = this.y -15;
  }
  if (keys==='down'){
    this.y=this.y+15;
  }
  if (keys==='right'){
    this.x = this.x +15;
  }
  if (keys==='left'){
    this.x = this.x -15;
  }

}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//This function adds the functionality to the button. Once clicked, engine.js is run, launching the game. It uses an event listener. Once launched
// the button is removed from the DOM to prevent the Engine from being initiated multiple times. Removing the button is a simple solution. 

document.getElementById("launch").addEventListener("click",function(){
  var a = document.createElement("script");
  a.src="js/engine.js";
  document.body.appendChild(a);
  document.getElementById("launch").remove();
  document.getElementById("characterSelection").remove();
});


//Self explanatory function
Hero.prototype.drawScore = function() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+score, 20, 100,50);
}



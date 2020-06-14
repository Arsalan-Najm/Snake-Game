//main structure of canvas
const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');
const playAgain = document.querySelector('.over');
const showScore = document.getElementById('point');
const lessScore = document.querySelector('.less');
const mediumScore = document.querySelector('.medium');
const highScore = document.querySelector('.high');
//size of the box in game
const box = 32;
//templateof the game
const ground = new Image();
ground.src = "images/ground.png";
//image of food in the game
const foodImg = new Image();
foodImg.src = "images/food.png";
//all audio contents
const eat = new Audio();
const dead = new Audio();
const up = new Audio();
const down = new Audio();
const left = new Audio();
const right = new Audio();
eat.src = "audio/eat.mp3";
dead.src = "audio/dead.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
//draw the snake
let snake = [];
snake[0] = {
	x : 9*box,
	y : 10*box,
}
//food which appears in the game
let food = {
	x : Math.floor(Math.random()*17+1) * box,
	y : Math.floor(Math.random()*15+3) * box
}
//variable of score
let score = 0;
//variable of direction
let d;
//structure which controls the snake
document.addEventListener("keydown",direction);
function direction(event) {
	let key = event.keyCode;
	if(key == 37 && d != "RIGHT"){
		d = "LEFT";
		left.play();
	}else if(key == 38 && d != "DOWN") {
        d = "UP";
        up.play();
	}else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        left.play();
	}else if(key == 40 && d != "UP") {
        d = "DOWN";
        down.play();
	}
}
//structure which snake hits it's self
function collisionDetection(head,body) {
	for(let i=0;i<body.length;i++) {
		if(head.x == body[i].x && head.y == body[i].y) {
			return true;
		}
	}
	return false;
}
//function which draw everything on the game
function update() {
	ctx.drawImage(ground,0,0,);
	for(let i=0;i<snake.length;i++){
		ctx.fillStyle = (i == 0)? "#000" : "#5b3139";
		ctx.fillRect(snake[i].x,snake[i].y,box,box);
		ctx.strokeStyle = "#eaf7f8";
		ctx.lineWidth = 3;
		ctx.strokeRect(snake[i].x,snake[i].y,box,box);
	}
	ctx.drawImage(foodImg,food.x,food.y);
//variable of snake direction which changes during the game 
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

//structure which snake start to move
	if(d == "LEFT") snakeX -= box;
	if(d == "UP") snakeY -= box;
	if(d == "RIGHT") snakeX += box;
	if(d == "DOWN") snakeY += box;
//structure which snake can eat the food
	if(snakeX == food.x && snakeY == food.y) {
		score++;
		eat.play();
		food = {
	       x : Math.floor(Math.random()*17+1) * box,
	       y : Math.floor(Math.random()*15+3) * box
          }
	  }else {
	  	snake.pop();
	  }
//variable of new head
	  	let newHead = {
		x : snakeX,
		y : snakeY
	}
//collision of snake in walls
	  if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collisionDetection(newHead,snake)) {
	  	clearInterval(game);
	  	playAgain.classList.add("active");
	  	showScore.innerHTML = score;
	  	if(score <= 6) lessScore.classList.add("show");
	  	if(score > 6) mediumScore.classList.add("show");
	  	if(score > 12) {
	  		highScore.classList.add("show");
	  		mediumScore.classList.remove("show");
	  	}
	  	dead.play();
	  }
//draw the score and the new head which everytime snake eats the food
	snake.unshift(newHead);
	ctx.fillStyle = "white";
	ctx.font = "40px tahoma";
	ctx.fillText(score,3*box,1.6*box);
}
//interval which runs the game persecond
let game = setInterval(update,100);

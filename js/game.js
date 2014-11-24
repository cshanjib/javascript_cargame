// JavaScript Document

var gameLoopId;
var mapId;
var distance_indicatorId;
var player;
var map; 
var life_indicator;//indicator to show the number of lives left
var score_indicator;//indicator to display game score
var distance_indicator;//indicator to show the player position in the map
var bullet_indicator; //indicator to show the number of bullets left
var game_score;//store the user score
var no_lives;//no of lives the plarer have
var no_bullets;//no of bullets the player can fire
var opponents = []; // Array to store each opponents car
var firedBullets = []; //Array to store fired bullets
var ppos; //position of the player
var mapypos; //position of the map road
var disypos; //reference position to calculate the position of the indicator
var gameover; //reference to show the gameover message when the player run out of the lives
var detectCollisionId;//id to clear the thread check collision of the player with opponent car
var detectBulletHitsId;//id to clear the thread to check the collision of bullets and the opponent car
var gameFixId;
initializeGame();
function clearGame(){
	initializeGame();	
}
function initializeGame(){
	for(var i=0;i<opponents.length;i++){
			opponents[i].removeOpponent();
	}
	clearInterval(mapId);
	clearInterval(distance_indicatorId);
	clearInterval(gameLoopId);
	clearInterval(detectCollision);
	clearInterval(detectBulletHits);
	clearInterval(gameFixId);
	
	
	gameLoopId = setInterval(game, 1000);
	mapId = setInterval(mapMove, 5);
	distance_indicatorId = setInterval(moveDistanceIndicator, 550);
	detectCollisionId = setInterval(detectCollision, 20);
	detectBulletHitsId = setInterval(detectBulletHits, 20);
	gameFixId = setInterval(gamefix, 2000);
	
	player = document.getElementById('player');
	player.style.top=500+'px';
	player.style.left=188+'px';
	
	map = document.getElementById('road');
	life_indicator = document.getElementById('lifeindicator');
	score_indicator = document.getElementById('gamescore');
	distance_indicator = document.getElementById('indicator-length');
	bullet_indicator = document.getElementById('bulletindicator');
	gameover = document.getElementById('game-over');
	
	gameover.style.visibility="hidden";
	
	
	game_score = 0;
	no_lives = 5;
	no_bullets = 5;
	ppos=188;
	mapypos=-9400;
	disypos=9400;
	life_indicator.style.width = (30 * no_lives) + 'px';
	bullet_indicator.style.width = (30 * no_bullets) + 'px';
	score_indicator.innerHTML = game_score;
}


function game(){
	if(opponents.length<=5){
		var g = new GenerateOpponents();
		g.createOpponent();
	}
}
function GenerateOpponents(){
	this.x = 0;
	this.y = 0;
	this.intervalId=0;
	this.element;
	var that = this;
	this.createOpponent = function(){
		that.element = document.createElement('div');
		var num = getRandom(0,3);
		if(num == 0){
			that.element.className="opp-car1";
		}else if(num == 1){
			that.element.className="opp-car2";
		}else{
			that.element.className="opp-car3";
		}
		
		document.getElementById("container").appendChild(that.element);
		that.x = getRandomPos();
		that.y = 0;
		that.element.style.left = that.x+'px';
		that.intervalId = setInterval(that.chargeOpponent,20);
		opponents.push(that);
	}	
		
	this.chargeOpponent = function(){
			
		that.y = that.y+5;
		that.element.style.top = that.y +'px';
		//console.log("asdsd");
		
		if(that.y>=600){
			//opponents.splice(0,1);
			that.removeOpponent();
			
		}
	}
	this.removeOpponent = function(){
		var index = opponents.indexOf(that);
			opponents.splice(index, 1);
			clearInterval(that.intervalId);
			document.getElementById("container").removeChild(that.element);
			game_score++;
			score_indicator.innerHTML = game_score;
	}
}


//firing bullets
function FireGun(){
	this.x = 0;
	this.y = 0;
	this.intervalId=0;
	this.element;
	var that = this;
	this.createBullet = function(){
		that.element = document.createElement('div');
		that.element.className="bullets";
		document.getElementById("container").appendChild(that.element);
		that.x = parseInt(player.style.left.split('px')[0])+40;
		that.y = player.style.top.split('px')[0];
		that.element.style.left = that.x+'px';
		that.intervalId = setInterval(that.fireBullet,20);
		firedBullets.push(that);
	}	
		
	this.fireBullet = function(){
			
		that.y = that.y-10;
		that.element.style.top = that.y +'px';
		//console.log("asdsd");
		
		if(that.y<=0){
			//opponents.splice(0,1);
			that.removeBullet();
			
		}
	}
	this.removeBullet = function(){
		var index = firedBullets.indexOf(that);
		firedBullets.splice(index, 1);
		clearInterval(that.intervalId);
		document.getElementById("container").removeChild(that.element);
	}
}

document.onkeydown = function(e) {
   // e = e || window.event;
	var p = document.getElementById('player');
    switch(e.which || e.keyCode) {
		case 37: // left button --->Move Left event
		if(ppos>40){
			ppos -=148;	
			p.style.left=ppos+'px';
			//detectCollision();
		}
        break;

        case 38: // up button --->Shooting event
		if(no_bullets>0){
			no_bullets--;
			bullet_indicator.style.width = (no_bullets*30)+'px';
			var bullet = new FireGun();
			bullet.createBullet();
		}
		
        break;

        case 39: // right button --->Move Right event
		if(ppos<289){
			ppos +=148;	
			p.style.left=ppos+'px';
			//detectCollision();
		}
        break;

        case 40: // down
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
};







//listeners for collision

function detectCollision(){
	var boom;
	that = this;
	//console.log(player.style.top);
	for(var i=0;i<opponents.length;i++){
		if(opponents[i].element.style.top.split('px')[0]>=400 && opponents[i].element.style.left==player.style.left){
			console.log("boom:Left:"+opponents[i].element.style.left+":"+player.style.left+":"+opponents[i].element.style.top);
			
			
			opponents[i].removeOpponent();
			this.boom = document.createElement('div');
			this.boom.className='booom';
			this.boom.style.left=player.style.left;
			this.boom.style.top=(player.style.top.split('px')[0]-25)+'px';
			
			
			no_lives--;
			life_indicator.style.width = (no_lives*30)+'px';
			
			
			document.getElementById("container").appendChild(this.boom);
			
			setTimeout(this.removeBoomCollide, 20);	
			
		}
		
	}
	this.removeBoomCollide = function(){
		if(that.boom.parentNode){
			document.getElementById("container").removeChild(that.boom);
		}
	}
}


//listeners for bullet hits
function detectBulletHits(){
	var boom;
	that = this;
	for(var j=0;j<firedBullets.length;j++){
		for(var i=0;i<opponents.length;i++){
			if(opponents[i].element.style.top.split('px')[0]>=(parseInt(firedBullets[j].element.style.top.split('px')[0])-100)&& opponents[i].element.style.left.split('px')[0]==(parseInt(firedBullets[j].element.style.left.split('px')[0])-40)){
				this.boom = document.createElement('div');
				this.boom.className='booom';
				this.boom.style.left=opponents[i].element.style.left;
				this.boom.style.top=(parseInt(firedBullets[j].element.style.top.split('px')[0])-50)+'px';
				document.getElementById("container").appendChild(this.boom);
				opponents[i].removeOpponent();
				firedBullets[j].removeBullet();
				
				setTimeout(this.removeBoomBullet, 20);	
				
			}
			
		}
	}
	this.removeBoomBullet = function(){
		document.getElementById("container").removeChild(that.boom);
		
	}
}


function mapMove(){
	
	mapypos+=1;
	
	map.style.top=mapypos+'px';
	if(mapypos == 0 || no_lives == 0){
		clearInterval(mapId);
		clearInterval(distance_indicatorId);
		clearInterval(gameLoopId);
		
		clearInterval(detectCollision);
		clearInterval(detectBulletHits);
		gameover.style.visibility="visible";
		if(no_lives == 0){
			gameover.innerHTML="Game Over";	
		}else{
			gameover.innerHTML="You Win";
		}
		
		for(var i=0;i<opponents.length;i++){
			opponents[i].removeOpponent();
		}
		
	}
	
	
}
function moveDistanceIndicator(){
	disypos+=1;
	
	distance_indicator.style.bottom=((disypos+mapypos)/50)+'px';
	if(disypos == 190){
		clearInterval(distance_indicatorId);
	}
}

function gamefix(){
	var er_boom = document.getElementsByClassName("booom");

	for(var i=0;i<er_boom.length;i++){
		
		document.getElementById("container").removeChild(er_boom[i]);
		
	}
}

function getRandomPos(){
		var r= Math.floor((Math.random() * 3) + 0); 
		if(r==0){
			return 40;
		}else if(r==1){
			return 188;
		}else{
			return 336;
		}
}

function getRandom(min, max) {
        return Math.floor((Math.random() * max) + min);

}
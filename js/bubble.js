/*// JavaScript Document

var x=0;
var y=0;
var xdir=true;
var ydir=true;
function motion(){
		var box = document.getElementById("bo");
		y = y+5;
		
		box.style.bottom = y +'px';
		console.log("asdsd");
		
		
		parent.appendChild(child);
		

}
	
	var c = setInterval(motion,100);
	
	
	function createCircle(x,y,el){
		this.x=0;
		this.y=0;
		this.el=el;
	}
	var c = new createCircle();
	c.x = Math.floor((Math.random() * 100) + 1); 
	c.y = Math.floor((Math.random() * 100) + 1); 
	var child = document.createElement('div');
	child.height="100px";
	child.width="100px";
	c.el = child;
	
	setInterval(motion, 1000);*/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	var cursorX=0;
	var cursorY=490;
	document.getElementById("bigg").addEventListener("mousemove",checkCursor,false);
	function checkCursor(e)
	{
		cursorX = e.clientX;
		cursorY = e.clientY;
		//alert("Cursor at: " + cursorX + ", " + cursorY);
	}
	//setInterval("checkCursor()", 1000);
	function Circle(){
		this.x=0;
		this.y=0;
		this.dir=true;
		this.intervalId;
		this.element;
		var that = this;
		this.createCircle = function(){
			that.element = document.createElement('div');
			that.element.className = "circle";
			document.getElementById("bigg").appendChild(that.element);
			that.x = cursorX;
			that.y = cursorY;
			that.element.style.border="1px solid black+";
			that.element.style.left=that.x + 'px';
			that.element.style.top=that.y + 'px';
			that.intervalId = setInterval(that.motion,0);
		};	
		
		this.motion = function(){
			
			that.y = that.y-5;
			that.element.style.top = that.y +'px';
			console.log("asdsd");
			if(that.y<=0){
				clearInterval(that.intervalId);
				document.getElementById("bigg").removeChild(that.element);	
			}
		}
	}
	
	setInterval(bubbles,20);
	
	function bubbles(){
		var c = new Circle();
		c.createCircle();
		
	}
	function getRandom(){
		return Math.floor((Math.random() * 790) + 1); 
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

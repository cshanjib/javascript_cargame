
var x=0;
var y=0;
var xdir=true;
var ydir=true;
function motion(){
		var box = document.getElementById("bo");
		if(ydir){
			y = y+5;
		}else{
			y=y-5;	
		}
		
		if(xdir){
			x = x+5;
		}else{
			x=x-5;	
		}
		
		
		box.style.top = x +'px';
		box.style.left = y +'px';
		console.log("asdsd");
		if(y>=700){
			ydir = false;	
		}else if(y<=0){
			ydir = true;
		}
		if(x>=400){
			xdir = false;	
		}else if(x<=0){
			xdir = true;
		}

	}
	
	var c = setInterval(motion,10);
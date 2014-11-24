// JavaScript Document
var e = document.getElementById("get");
e.innerHTML+="<em>BibuuMan</em>";

e.style.backgroundColor="#0F0";


/*addClass(e,"newClass");
addClass(e,"sdd");
console.log(e.className);
removeClass(e,"sdd");
console.log(e.className);*/

/*var e = document.getElementsByClassName("bor");

for(i=0;i<e.length;i++){
	e[i].style.border="red 1px solid";	
}*/

function addClass(el, cl){
	var classs = el.className;
	var is =false;
	var pp = classs.split(" ");
	for(var i=0;i<pp.length;i++){
		if(pp[i] == cl){
			return;	
		}
		
	}
	if(pp.length == 0){
		el.className =cl;
	}else{
		el.className +=" "+cl;
	}
	
}

function removeClass(el, cl){
	var classs = el.className;
	var cla="";
	var pp = classs.split(" ");
	for(var i=0;i<pp.length;i++){
		if(pp[i] != cl){
			if(i==0){
				cla = pp[i];
			}else{
				cla = cla+" "+ pp[i];
			}
				
		}	
	}
	el.className =cla;
	
}

/*var el = document.createElement('div');
var ee = document.getElementById("ss");
el.innerHTML="some text";
el.className="as";
el.style.background='red';
ee.appendChild(el);
el.onclick = func(this);


function func(e){
	console.log(e);
}*/


var e = document.getElementsByClassName("bor");

for(var i=0;i<e.length;i++){
	
	/*function abb(pos){
		console.log(e[pos]);
	}
	console.log(i);*/
	var en=e[i];
	
	en.onclick=function(){
		console.log(en);
	}	
}

/*(function y(n){
	console.log(n)
	
	})(10);
	
	
var dom={tag:'div',
	content:'',
	children:[{
			tag:'div',
			content:'abc'
		
		},{
			tag:'input'
			},{
			tag:'button', content:'click me'
			}
	
	]
	
	
		};*/
		
		
		// JavaScript Document

var e = document.getElementsByClassName("imgg");
var divv = document.getElementById("chg-img");

/*for(var i=0;i<e.length;i++){
	
	
	var en=e[i];
	
	en.onclick=(function(element){
		
		return function(){
			divv.setAttribute('src', element.src);
			console.log( element.src);
		}
		
	})(en);
}*/
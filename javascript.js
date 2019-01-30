//if we click on start/reset button
	//if we are playing
		//reload page
	//if we are not playing
	   //1.set score to 0
	   //2.show countdown box
	   //3.reduce time by 1sec in loops
	     //timeleft?
		   //yes ->continue
		   //no -> gameover
	   //4.change button to reset
	   //5.Generate new Q&A
	   
	   
//if we click on answer box
  //if we are playing?
   //correct?
     //yes 
	   //1.increase the score by 1
	   //2.show correct box for 1sec
	   //3.generate new Q&A
	 //no
	   //show try again box for 1 sec

var playing=false;   
var score;
var action;
var timeRemaining;
var crctAnswer;
getElement("startreset").onclick=function(){
	if(playing===true){
		location.reload();
	}else{
	   playing=true;
	   score =0;	
	   timeRemaining=60;
	   getElement('scorevalue').innerHTML = score;
	   show("timeremaining");
	   getElement('startreset').innerHTML = "Reset Game";
	   getElement('timeremainingvalue').innerHTML = timeRemaining;
	   hide("gameOver");
	   startCountDown();
	   generateQA();
	}
		
};

for(var i=1;i<5;i++){
	getElement("box"+i).onclick=function(){
	if(playing===true){		
		if(this.innerHTML === crctAnswer.toString()){
			score++;
			getElement("scorevalue").innerHTML=score;
			hide("wrong");
			show("correct");
			setTimeout(function(){
				hide("correct");
			},1000);
			generateQA();
		}else{
			hide("correct");
			show("wrong");
			setTimeout(function(){
				hide("wrong");
			},1000);
		}
	}
};
}



function generateQA(){
	var wrongAnswer;
	var x = 1+Math.round(Math.random()*9);
	var y = 1+Math.round(Math.random()*9);
	crctAnswer = x*y;
	getElement("question").innerHTML = x +"x"+ y;
	var crctPosition = 1+Math.round(Math.random()*3);
	getElement("box"+crctPosition).innerHTML=crctAnswer;
	
	var answers=[crctAnswer];
	
	
	for(var i=1;i<5;i++){
		if(i!=crctPosition){	
			wrongAnswer = (1+Math.round(Math.random()*9)) * (1+Math.round(Math.random()*9));
			while(answers.indexOf(wrongAnswer)> -1){
				wrongAnswer = (1+Math.round(Math.random()*9)) * (1+Math.round(Math.random()*9));
			}
			answers.push(wrongAnswer);
			getElement("box"+i).innerHTML = wrongAnswer;
		}
	}
}

function startCountDown(){
	action = setInterval(function(){
		timeRemaining--;
		getElement('timeremainingvalue').innerHTML = timeRemaining;
		if(timeRemaining===0){
			stopCountDown();
			show("gameOver");
			getElement("gameOver").innerHTML="<p>Game Over!</p><p>Your score is "+ score +"</p>"
			hide("timeremaining");

			hide("correct");
			hide("wrong");
			playing=false;
			getElement("startreset").innerHTML="Start Game";
		}
	},1000);
};

function stopCountDown(){
	clearInterval(action);
}

function getElement(ele){
	return document.getElementById(ele);
}

function hide(id){
	var element = getElement(id);
	if(!!element)
	  element.style.display = "none";
}

function show(id){
	var element = getElement(id);
	if(!!element)
	  element.style.display = "block";
}


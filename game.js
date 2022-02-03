// alert("Successful");
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var randomChosenColor;
var randomNumber;
var userClickedPattern=[];
var level=0;
var current=0;
var correct=1;
var keyEntered=0;

// $('.button').prop('disabled', true);
//Adding Event Listeners for all buttons
var count = document.getElementsByClassName("btn");
for(var i=0;i<count.length;i++)
{
  count[i].addEventListener("click",userEntry);
}

//Hearing for keyPress
$(document).keypress(nextSequence);


//To-do on user hitting some button
function userEntry(){
  if(keyEntered==0)
  {
    alert("Kindly press any key to start game");
    userClickedPattern=[];
  }
  else
  {
    var userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    // checkAnswer(level);
    current=current+1;
    checkAnswer(current);
    if(current===level)
    {
      current=0;
      setTimeout(nextSequence,1000);
    }
  }
}

//checking if user entered sequence is same as system generated sequence
function checkAnswer(currentLevel){
  // console.log(currentLevel);  
  for(var i=0;i<currentLevel;i++)
  {
    if(userClickedPattern[i]===gamePattern[i])
    {
      console.log("success");
    }
    else{
      var audio1=new Audio("sounds/wrong.mp3");
      audio1.play();
      correct=0;
      console.log("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
        },5000);
        $("h1").text("You Lost 😐");
      // location.reload();
      // var audio1=new Audio("sounds/blue.mp3");
      // audio1.play();
      level=0;
      userClickedPattern=[];
      gamePattern=[];
      // location.reload(true);
    }
  }
}


//System generating next sound
function nextSequence(){
  keyEntered=1;
  current=0;
  userClickedPattern=[];
  level=level+1;
  $("h1").text("Level "+level);
  randomNumber=Math.floor(Math.random()*4);
  randomChosenColor=buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("."+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  // var audio=new Audio("sounds/"+randomChosenColor+".mp3");
  // audio.play();
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}


//provide some animation on hitting/generating the button
function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
  $("."+currentColor).removeClass("pressed");
  },100);
  // $("."+currentColor).removeClass("pressed");
}


//Playing sound as per the button pressed/generated
function playSound(userChosenColor){
  var audio=new Audio("sounds/"+userChosenColor+".mp3");
  audio.play();
}


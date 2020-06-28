var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var keyPressTime = 0;

let buttonClicked = 0;


function nextSequence(){

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playsound(randomChosenColor);

};

$(".btn").click(function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function playsound(name){

  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();

}

function animatePress(currentColor){
  $(".btn").click(function(){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
      $("#" + currentColor).removeClass("pressed");
    },100)
  })
};

$(document).keypress(function(){
  if (keyPressTime === 0){
    nextSequence();
    $("#level-title").text("Level " + level );
    $("h3").text(" ");
  }

  keyPressTime ++;
})

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();},1000);
    }
  }else{
    console.log("Wrong");
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    $("h3").text("Your score is "+ level);
    startOver();
  }

};

function startOver(){
  level = 0;
  gamePattern=[];
  keyPressTime = 0;
  buttonClicked = 0;
}

$("#mobileStartButton").click(function(){
  if (buttonClicked === 0){
    setTimeout(nextSequence,750);
    $("#level-title-m").text("Level " + level );
    $("h3").text(" ");
  }
  buttonClicked ++;
})

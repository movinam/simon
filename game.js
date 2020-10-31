var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

//Once the user clicks a key, the game starts

$(document).keydown(function(){
  if(!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

//Button click listener

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//Generates the sequence

function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  level = level + 1;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//Plays sound

function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

//Adds and removes the pressed class

function animatePress(currentColour) {
  var currentButton = $("." + currentColour);
  currentButton.addClass("pressed");
  setTimeout(function() {
    currentButton.removeClass("pressed");
  }, 100);
}

//Checks player's answer with the generated sequence

function checkAnswer(currenLevel) {
  if(userClickedPattern[currenLevel] === gamePattern[currenLevel]) {
    console.log("Success");
    if(currenLevel === gamePattern.length - 1) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log("Failure");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//Resets values

function startOver() {
  level = 0;
  gameStarted = false;
  gamePattern = [];
}

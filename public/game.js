const buttonColours=["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function startOver(){
    level = 0;
    gamePattern=[];
    started = false;
}

$(document).keypress(function(){
    if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(() => {
    $("#"+currentColour).removeClass("pressed");   
    }, 100);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } 
    else{
        console.log("wrong");
         playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart"); 
      startOver();
    }
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    console.log(randomNumber);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);
    //playSound(randomChoosenColour);
    $("#"+randomChoosenColour).fadeIn(250).fadeOut(250).fadeIn(250);
    playSound(randomChoosenColour);
    animatePress(randomChoosenColour);
}

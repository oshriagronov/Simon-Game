var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour;
var level = 0;
var userNumnerClicks = 0;

function playSound(name){
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var color = buttonColours[randomNumber];
    $("#" + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(color);
    level ++;
    $('h1').text("level " + level);
    return randomNumber;
}

function checkAnswer(){
    var userLost;
    if(userNumnerClicks === level){
        for(var i = 0; i <= level; i++){
            if(gamePattern[i] !== userClickedPattern[i]){
                userLost = true;
                break;
            }
        }
        if(userLost === true){
            $("body").addClass("game-over");
            playSound("wrong");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
        else{
            setTimeout(function(){
                gamePattern.push(buttonColours[nextSequence()]);
                userClickedPattern = [];
                userNumnerClicks = 0;
            }, 1000);
        }
    }
}

function startOver(){
    level = 0;
    userClickedPattern = [];
    userNumnerClicks = 0;
    gamePattern = [];
}

$(".btn").on("click" ,function(event){
    var userChosenColour = event.target.id;
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    userNumnerClicks ++;
    checkAnswer();

});
$(document).on("keydown", function(){
    if(level == 0){
        $("h1").text('level 0');
        gamePattern.push(buttonColours[nextSequence()]);
        userClickedPattern = [];
        userNumnerClicks = 0;
    }
});
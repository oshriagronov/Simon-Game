const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let randomChosenColour;
let level = 0;
let userNumnerClicks = 0;

function playSound(name){
    const sound = new Audio("./public/assets/sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function nextSequence(){
    const randomNumber = Math.floor(Math.random() * 4);
    const color = buttonColours[randomNumber];
    $("#" + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(color);
    level ++;
    $('h1').text("level " + level);
    return randomNumber;
}

function checkAnswer(){
    let userLost;
    if(userNumnerClicks === level){
        for(let i = 0; i <= level; i++){
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
    let userChosenColour = event.target.id;
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
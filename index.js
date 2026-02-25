var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).keydown(function () {
    if (!started) {
        // $('#level-title').text('level' + level)
        setTimeout(function(){nextSequence()},1000)
        started = true
    }
})


var userClickedPattern = [];
var gamePattern = []

function nextSequence() {
    userClickedPattern = []
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColors[randomNumber] 
    gamePattern.push(randomChosenColour)
    playSound(randomChosenColour)
    animatePress(randomChosenColour)
    level++
     $('#level-title').text('level ' + level)
}


$('.btn').click(function () {
    var userChosenColour = $(this).attr('id')
    userClickedPattern.push(userChosenColour)

    playSound(userChosenColour)
    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length-1)
})


function playSound(name) {
    $('#' + name).fadeOut(100).fadeIn(100)
    var audio = new Audio('sounds/' + name + '.mp3')
    audio.play()
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed') 
    setTimeout(function(){
        $('#' + currentColour).removeClass('pressed')
    }, 100);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
        console.log('success')

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () { nextSequence() }, 1000)
        }
    } else {
            console.log(wrongSound)
            var wrongSound = new Audio('sounds/wrong.mp3')
            wrongSound.play()
        gameOver()
        startOver()
        }
    }


function gameOver() {
    $('h1').text('Game Over, Press Any Key To Restart')
    $('body').addClass('game-over')
    setTimeout(() => {
            $('body').removeClass('game-over')
    }, 200);
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}
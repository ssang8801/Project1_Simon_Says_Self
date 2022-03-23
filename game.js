var colorList = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];

var starter = false;

var level = 0;

$(document).on("keypress", function(){
  if(!starter){
    patternGenerator();
    starter = true;
  }
})

$('.btn').on('click', function(event){
  if(starter){
    userPattern.push(event.target.id);
    makeFlash(event.target.id);
    makeSound(event.target.id);
    compare(userPattern.length-1);
  }else{
    $("body").addClass('game-over');
    setTimeout(function(){
      $("body").removeClass('game-over');
    }, 800);
    $('h1').text("You lost. Press any key to start a new game.");
    let audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    gamePattern = [];
    userPattern = [];
    starter = false;
    level = 0;
  }

})

function effects(x){
  setTimeout(function(){
    makeFlash(gamePattern[x]);
    makeSound(gamePattern[x]);
  }, 550*x);
}

function patternGenerator(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomColor = colorList[randomNumber];
  gamePattern.push(randomColor);
  if(level > 0){
    for(let i = 0; i < gamePattern.length; i++){
      effects(i);
    }
  }
  if(level < 1){
  makeFlash(randomColor);
  makeSound(randomColor);
}
  console.log(gamePattern);
  level = level + 1;
  $('h1').text("Stage Number: "+ level + ".")
}


function makeFlash(color){
  let temp = "." + color;
  $(temp).css("opacity", 0.1);
  setTimeout(function(){
    $(temp).css("opacity", 1)
  }, 100)
}

function makeSound(color){
  let temp = "./sounds/" + color + ".mp3";
  var audio = new Audio(temp);
  audio.play();
}

function compare(numItems){
  if(gamePattern[numItems] === userPattern[numItems]){
    if(gamePattern.length === userPattern.length){
      setTimeout(function(){patternGenerator();
      userPattern = [];
      }, 1000);
    }else{

    }

  }else{
    $("body").addClass('game-over');
    setTimeout(function(){
      $("body").removeClass('game-over');
    }, 800);
    $('h1').text("You lost. Press any key to start a new game.");
    let audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    gamePattern = [];
    userPattern = [];
    starter = false;
    level = 0;
  }
}

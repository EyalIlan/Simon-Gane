

var colors = ['red','green','blue','yellow']
var gamePatterns = []
var UserInputs = []
var level = 0
var start = true

let topScore = localStorage.getItem('topScore')
if(topScore){
  document.getElementById('best_score').innerHTML = topScore
}


function nextSequence(){

   var randomNumber = Math.floor(Math.random()*4)//adding the next sequence the array
   var randomColor  = colors[randomNumber]
   gamePatterns.push(randomColor)
   makeSound(randomColor)
   animeted(randomColor)
   $('h1').html('level '+level)
   level = level + 1
}

$('.btn').click(function(){//user  enter another button click to the array
     var userClick  = $(this).attr('id')
     UserInputs.push(userClick) 
     makeSound(userClick)
     animeted(userClick)
     checkResult(UserInputs.length-1)
    })


// play the sound
function makeSound(sound){
 var audio = new Audio('testSound/'+sound+'.mp3')
 audio.play()
}


function animeted(currentPress){

$('.'+currentPress).fadeOut(100).fadeIn(100)
 
 
}

$('body').keypress(function(){ /// starting the game

  if(start === true){
    start = false

  

    nextSequence()
  }
})

function checkResult(index){
  
      
   if(UserInputs[index] === gamePatterns[index]){
      if(index === gamePatterns.length-1){
        UserInputs = []
        setTimeout(() => {
          nextSequence()
        }, 500);
        
      }
   }else{
    makeSound('wrong')
    
    let Score = document.getElementById('best_score')
    console.log(typeof Score.innerHTML);
    if(level > parseInt(Score.innerHTML)){
      Score.innerHTML= level -1
      localStorage.setItem("topScore",level -1)
    }

    $('body').addClass('game-over')

    setTimeout(() => {
      $('body').removeClass('game-over')
    }, 200);
    
     gamePatterns = []
     UserInputs = []
     level = 0
     start = true
     $('h1').html('Press any Key to Start')
   }
}

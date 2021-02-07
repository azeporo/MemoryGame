const gameContainer = document.getElementById("game");
let replay = document.querySelector('#play-again')
let form = document.querySelector('form')
let input = document.querySelector('#userInput')
let cardsClicked = 0;
let score = 0;
let cardOne = ''
let cardTwo = ''
let eventActive = false


//EVALUATES THE USERS INPUT TO COMENCE GAME OR PLAY AGAIN
form.addEventListener('submit', function(e){
  e.preventDefault();
  let num = input.value
  numOfCards(num);
  createDivsForColors(shuffledColors);
  form.classList.toggle('in-game');
  replay.classList.value ='btn btn-dark mb';
})

replay.addEventListener('click', function(e){
  location.reload();
})

//FUNCTION TO ESTABLISH THE NUMBER OF CARDS AND AND GENERATE THE RANDOM COLORS FOR THE ARRAY
function numOfCards (num){
  for(let i=0; i<num; i++){
   
    let r = Math.floor(Math.random() *256)
    let g = Math.floor(Math.random() *256)
    let b = Math.floor(Math.random() *256)
    
    COLORS.push(`rgb(${r},${g},${b})`);
    COLORS.unshift(`rgb(${r},${g},${b})`);
  }
}

const COLORS = [];

// FUNCTION TO SHUFFLE THE COLORS IN THE ARRAY
function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

// FUNCTION LOOPS OVER THE ARRAY, CREATES THE DIV ELEMENTS, ADDS THE CLASS CORRESPONDING TO THE COLOR
// ADDS AND EVENT LISTENER AND APPENDS THE NEW ELEMENT

function createDivsForColors(colorArray) {
  for (let color of colorArray) {

    const newDiv = document.createElement("div");

    newDiv.classList.add(color);
    newDiv.style.backgroundColor = "whitesmoke"
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

//FUNCTION THAT IS EXECUTED WHEN A VALID SELECTION IS MADE BY THE USER
function validSelection (){
  let card = event.target;
  card.style.backgroundColor = card.classList
  cardsClicked ++;

  if (cardsClicked === 1){
  cardOne = card
  }
  else if (cardsClicked === 2){
    eventActive = true
    cardTwo = card
    cardsClicked = 0
    
    score ++;
    let currentScore = document.querySelector('#total-score');
    currentScore.innerText = `Score: ${score}`

      if(cardOne.classList.value !== cardTwo.classList.value){
        setTimeout(function(){
            cardOne.style.backgroundColor = 'whitesmoke'
            cardTwo.style.backgroundColor = 'whitesmoke'
            eventActive = false
        },500)
      }
      else{
            eventActive = false
      }
  } 
  }

//EVENT HANDLER THAT RUNS THE CODE WHEN A VALID SELECTION IS MADE
function handleCardClick(event) {
  if(eventActive !== true){
    if(event.target.style.backgroundColor === "whitesmoke"){
      validSelection();
    }
  }
}

//CODE FOR THE GAME TITLE
function randomRGB (){
    const r = Math.floor(Math.random()*256)
    const g = Math.floor(Math.random()*256)
    const b = Math.floor(Math.random()*256)
    return `rgb(${r},${g},${b})`
}

const letters = document.querySelectorAll('.letter');

setInterval(function(){
    for (let letter of letters){
        letter.style.color = randomRGB();
    }
}, 750);



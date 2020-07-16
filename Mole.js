const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min); //generates a round number of time that the moles pop up in
}
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length); //choses a random 
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}
function peep() {
  const time = randomTime(200, 1000);//random pop up frequency
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}
function startGame() {
  scoreBoard.textContent = 0; //reset score text
  timeUp = false;
  score = 0; //reset score in JS
  peep();
  setTimeout(() => timeUp = true, 10000) //10 Second game
}
function bonk(e) {
  if(!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}
moles.forEach(mole => mole.addEventListener('click', bonk));
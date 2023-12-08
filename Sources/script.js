//Player class declaration
class Player {
  //Properties declaration
  name;
  scoreRound;
  scoreGlobal;
  gameWon;
  //constructor definition
  constructor(name) {
    this.name = name;
    this.scoreRound = 0;
    this.scoreGlobal = 0;
    this.gameWon = 0;
  }
}
const player1 = new Player("player1");
const player2 = new Player("player2");

//Game class declaration
class DiceGame {
  //Properties declaration
  gameTurn;
  gameWinner;
  activePlayer;
  inactivePlayer;
  //Constructor definition
  constructor() {
    this.gameTurn = 0;
    this.gameWinner = undefined;
    this.activePlayer = undefined;
    this.inactivePlayer = undefined;
  }
}
const currentGame = new DiceGame();

//Variables declaration
//Dice
let dice = 0;
const diceTab =['./Images/dice_0.webp', './Images/dice_1.webp', './Images/dice_2.webp', './Images/dice_3.webp', './Images/dice_4.webp', './Images/dice_5.webp', './Images/dice_6.webp'];
let diceDOM = document.getElementById('dice');
diceDOM.setAttribute('src', diceTab[0]);
let diceAnimationVariable = 0;
//DOM: Round score
let player1ScoreRoundLabel = document.getElementById('player1ScoreRoundLabel');
let player1ScoreRoundDOM = document.getElementById('player1ScoreRound');
let player2ScoreRoundLabel = document.getElementById('player2ScoreRoundLabel');
let player2ScoreRoundDOM = document.getElementById('player2ScoreRound');
//DOM: Global score
let player1ScoreGlobalDOM = document.getElementById('player1ScoreGlobal');
let player2ScoreGlobalDOM = document.getElementById('player2ScoreGlobal');
//DOM: Game won
let player1GameWon = document.getElementById('player1GameWon');
let player2GameWon = document.getElementById('player2GameWon');
//DOM: Classes (for the display)
//Players 1 and 2
let player1SectionDOM = document.getElementById('player1Section');
let player2SectionDOM = document.getElementById('player2Section');
//Buttons roll dice hold and new game
let rollDiceButtonDOM = document.getElementById('rollDiceButton');
let holdButtonDOM = document.getElementById('holdButton');
let newGameButtonDOM = document.getElementById('newGameButton');

//Launch new game
document.getElementById('newGameButton').addEventListener('click', () => {
  currentGame.activePlayer = player1;
  currentGame.inactivePlayer = player2;
  //Reset the Round score
  player1.scoreRound = 0;
  player2.scoreRound = 0;  
  player1ScoreRoundDOM.innerHTML = 0;  
  player2ScoreRoundDOM.innerHTML = 0;
  player1ScoreRoundLabel.innerHTML = 'Current:';
  player2ScoreRoundLabel.innerHTML = 'Current:';
  //Reset the Global score
  player1.scoreGlobal = 0;  
  player2.scoreGlobal = 0;
  player1ScoreGlobalDOM.innerHTML = 0;  
  player2ScoreGlobalDOM.innerHTML = 0;
  //Reset the dice
  dice = 0;
  diceDOM.setAttribute('src', diceTab[dice]);
  //Reset the classes (for the display)
  //Reset the class for the active and the inactive players
  player1SectionDOM.classList.remove('activePlayer');  
  player2SectionDOM.classList.remove('activePlayer');
  player1SectionDOM.classList.remove('inactivePlayer');  
  player2SectionDOM.classList.remove('inactivePlayer');
  //Reset the class for the winner player
  player1SectionDOM.classList.remove('winnerPlayer');
  player2SectionDOM.classList.remove('winnerPlayer');
  //Reset the class for the invisible part to allow the game
  diceDOM.classList.remove('invisible');
  rollDiceButtonDOM.classList.remove('invisible');  
  holdButtonDOM.classList.remove('invisible');
  //Set player 1 as the active player and player 2 as the inactive player
  player1SectionDOM.classList.add('activePlayer');
  player2SectionDOM.classList.add('inactivePlayer');
});


//Roll the dice
rollDiceButtonDOM.addEventListener('click', () => {
  diceAnimationVariable = 5 + Math.ceil(Math.random() * 10);
  /*Launch the function disableButtons, which disables the buttons
  then call the function which rolls the dice
  then call the function which examines the result*/
  disableButtons();
});

//Hold the score
const holdButton = document.getElementById('holdButton');
holdButton.addEventListener('click', () => {
  //Add the round score to the global score of the active player
  currentGame.activePlayer.scoreGlobal += currentGame.activePlayer.scoreRound;
  document.getElementById(currentGame.activePlayer.name + 'ScoreGlobal').innerHTML = currentGame.activePlayer.scoreGlobal;
  currentGame.activePlayer.scoreRound = 0;
  document.getElementById(currentGame.activePlayer.name + 'ScoreRound').innerHTML = 0;
  //Reset of the dice
  dice = 0;
  diceDOM.setAttribute('src', diceTab[dice]);
  if (currentGame.activePlayer.scoreGlobal > 99) {
    //end of the game
    endgame();
  }
  else {
    //Change of player
    activePlayerChange();
  }
});


//Function to change the active player
function activePlayerChange() {
  if(currentGame.activePlayer == player1) {
    currentGame.activePlayer = player2;
    currentGame.inactivePlayer = player1;
    player1SectionDOM.classList.replace('activePlayer', 'inactivePlayer');
    player2SectionDOM.classList.replace('inactivePlayer', 'activePlayer');
  }
  else {
    currentGame.activePlayer = player1;
    currentGame.inactivePlayer = player2;
    player2SectionDOM.classList.replace('activePlayer', 'inactivePlayer');
    player1SectionDOM.classList.replace('inactivePlayer', 'activePlayer');
  }
}

//Function to end the game
function endgame() {
  //Disable the game to continue
  diceDOM.classList.add('invisible');
  rollDiceButtonDOM.classList.add('invisible');
  holdButtonDOM.classList.add('invisible');
  //Writte YOU WIN instead of the round score
  document.getElementById(currentGame.activePlayer.name + 'ScoreRoundLabel').innerHTML = 'YOU';
  document.getElementById(currentGame.activePlayer.name + 'ScoreRound').innerHTML = 'WIN';
  //Highlight the winner player
  document.getElementById(currentGame.activePlayer.name + 'Section').classList.add('winnerPlayer');
  //Update the winner player game won counter
  currentGame.activePlayer.gameWon++;
  document.getElementById(currentGame.activePlayer.name + 'GameWon').innerHTML = currentGame.activePlayer.gameWon;
}

//Function to waste time (*** to complete)
function wasteTime(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

//Function to roll dice which needs the wasting time function
//Roll the dice x times to simulate animation on the screen
async function rollDiceFunction() {
  for (let i = 1; i <= diceAnimationVariable; i++) {
      dice = Math.ceil(Math.random() * 6);
      diceDOM.setAttribute('src', diceTab[dice]);
      await wasteTime(200);
  };
};

//Display the dice 
async function diceDisplay() {
  //Wait for dice to roll
  await rollDiceFunction();
  await wasteTime(1000);
  if (dice === 1) {
    //Round score is lost
    currentGame.activePlayer.scoreRound = 0;
    document.getElementById(currentGame.activePlayer.name + 'ScoreRound').innerHTML = 0;
    //Reset of the dice
    dice = 0;
    diceDOM.setAttribute('src', diceTab[dice]);
    //Change of the active player
    activePlayerChange();
  }
  else {
    //Round score is increased and the game continue for the active player
    currentGame.activePlayer.scoreRound += dice;
    document.getElementById(currentGame.activePlayer.name + 'ScoreRound').innerHTML = currentGame.activePlayer.scoreRound;
  }
};


//Disable the buttons
async function disableButtons() {
  newGameButtonDOM.setAttribute('disabled', '');
  rollDiceButtonDOM.setAttribute('disabled', '');
  holdButtonDOM.setAttribute('disabled', '');
  /*Call the function that 
  calls the function which rolls the dice 
  then displays the dice value*/
  await diceDisplay();
  //Enable the buttons
  newGameButtonDOM.removeAttribute('disabled');
  rollDiceButtonDOM.removeAttribute('disabled');
  holdButtonDOM.removeAttribute('disabled');
};
//2 joueurs
class Player {
  //Déclaration des propriétés
  name;
  scoreRound;
  scoreGlobal;
  //Définition du constructeur
  constructor(name) {
    this.name = name;
    this.scoreRound = 0;
    this.scoreGlobal = 0;
  }
}
const player1 = new Player("player1");
const player2 = new Player("player2");

//Créer une nouvelle partie
class DiceGame {
  //Déclaration des propriétés
  gameTurn;
  gameWinner;
  activePlayer;
  //Déclaration du constructeur
  constructor() {
    this.gameTurn = 0;
    this.gameWinner = "";
    this.activePlayer = undefined;
  }
}
const currentGame = new DiceGame();

//Dés
let dice = 0;
const diceTab =['./Images/dice_0.webp', './Images/dice_1.webp', './Images/dice_2.webp', './Images/dice_3.webp', './Images/dice_4.webp', './Images/dice_5.webp', './Images/dice_6.webp'];
let diceDOM = document.getElementById('dice');
diceDOM.setAttribute('src', diceTab[0]);

//Lancer une nouvelle partie
document.getElementById('newGameButton').addEventListener('click', () => {
  currentGame.activePlayer = player1;
  //Ré-initialise les variables
  dice = 0;
  player1.scoreGlobal = 0;
  player1.scoreRound = 0;
  player2.scoreGlobal = 0;
  player2.scoreRound = 0;
  //Affichage des variables
  diceDOM.setAttribute('src', diceTab[dice]);
  document.getElementById('player1ScoreRound').innerHTML = 0;
  document.getElementById('player1ScoreGlobal').innerHTML = 0;
  document.getElementById('player2ScoreRound').innerHTML = 0;
  document.getElementById('player2ScoreGlobal').innerHTML = 0;
  //Ré-initialise les classes
  document.getElementById('player1Section').classList.remove('activePlayer');
  document.getElementById('player2Section').classList.remove('activePlayer');
  document.getElementById('player1Section').classList.remove('winnerPlayer');
  document.getElementById('player2Section').classList.remove('winnerPlayer');
  document.getElementById('player1Section').classList.add('activePlayer');
  diceDOM.classList.remove('invisible');
  document.getElementById('newDiceLaunchButton').classList.remove('invisible');
  document.getElementById('holdButton').classList.remove('invisible');
});


//Lancer le dé
document.getElementById('newDiceLaunchButton').addEventListener('click', () => {
  dice = Math.ceil(Math.random() * 6);
  diceDOM.setAttribute('src', diceTab[dice]);
  
  if(dice === 1) {
    //wait(2000).then(() => {
    currentGame.activePlayer.scoreRound = 0;
    document.getElementById(currentGame.activePlayer.name + 'ScoreRound').innerHTML = 0;
    alert(`Le dés vaut : ${dice}. Changement de joueur`)
    dice = 0;
    diceDOM.setAttribute('src', diceTab[dice]);
    activePlayerChange();
    //})
  }
  else {
    currentGame.activePlayer.scoreRound += dice;
    document.getElementById(currentGame.activePlayer.name + 'ScoreRound').innerHTML = currentGame.activePlayer.scoreRound;
  }
  console.log(currentGame.activePlayer);
});


//Garder le score
const holdButton = document.getElementById('holdButton');
holdButton.addEventListener('click', () => {
  //On ajoute le score du round au score global
  currentGame.activePlayer.scoreGlobal += currentGame.activePlayer.scoreRound;
  document.getElementById(currentGame.activePlayer.name + 'ScoreGlobal').innerHTML = currentGame.activePlayer.scoreGlobal;
  currentGame.activePlayer.scoreRound = 0;
  document.getElementById(currentGame.activePlayer.name + 'ScoreRound').innerHTML = 0;
  dice = '?';
  diceDOM.innerHTML = '?';
  if (currentGame.activePlayer.scoreGlobal > 99) {
    //Fin du jeu
    endgame();
  }
  else {
    //On change de joueur
    activePlayerChange();
  }
});


//Fonction de changement de joueur actif
function activePlayerChange() {
  if(currentGame.activePlayer == player1) {
    currentGame.activePlayer = player2;
    document.getElementById('player1Section').classList.remove('activePlayer');
    document.getElementById('player2Section').classList.add('activePlayer');

  }
  else {
    currentGame.activePlayer = player1;
    document.getElementById('player2Section').classList.remove('activePlayer');
    document.getElementById('player1Section').classList.add('activePlayer');
  }
}

//Fin du jeu
function endgame() {
  /*
  document.getElementById('player1Section').classList.remove('activePlayer');
  document.getElementById('player2Section').classList.remove('activePlayer');
  */
  diceDOM.classList.add('invisible');
  document.getElementById('newDiceLaunchButton').classList.add('invisible');
  document.getElementById('holdButton').classList.add('invisible');
  document.getElementById(currentGame.activePlayer.name + 'Section').classList.add('winnerPlayer')
  document.getElementById(currentGame.activePlayer.name + 'ScoreRoundLabel').classList.add('invisible');
  document.getElementById(currentGame.activePlayer.name + 'ScoreRound').innerHTML = 'WINNER';
}

function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
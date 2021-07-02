'use strict';
//Selecting Elements

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

//Game Start Conditions

let score = [];
let activeplayer;
let playing;
let currentScore;
const gameinit = function () {
  score = [0, 0];
  activeplayer = 0;
  playing = true;
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

gameinit();

const switchplayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activeplayer}`).textContent =
    currentScore;

  activeplayer = activeplayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Dice Rolling Functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generate Random Number From 1 To 6
    const dicescore = Math.trunc(Math.random() * 6) + 1;
    //console.log(dicescore);
    //2.Displaying It
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dicescore}.png`;

    //Checking If Number is 1 Or Not
    if (dicescore != 1) {
      currentScore += dicescore;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
    } else {
      //switching player
      switchplayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add Current Score To player's score
    score[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      score[activeplayer];

    //2.Check if player's score is>=00

    if (score[activeplayer] >= 20) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      //3.Switch To other player
      switchplayer();
    }
  }
});

btnNew.addEventListener('click', gameinit);

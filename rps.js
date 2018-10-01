/*
 * GLOBALS
 */
const pointsToWin = 5;
let playerScore = 0;
let computerScore = 0;
let isGameOver = false;

function displayRoundWeapons(player, computer) {
  let playerDiv = document.querySelector("#player-weapon");
  let computerDiv = document.querySelector("#computer-weapon");
  let playerFaClass = "fa fa-hand-".concat(player, "-o");
  let computerFaClass = "fa fa-hand-".concat(computer, "-o");

  playerDiv.innerHTML = '<i class="' + playerFaClass + '" aria-hidden="true"></i>';
  computerDiv.innerHTML = '<i class="' + computerFaClass + '" aria-hidden="true"></i>';
}

function displayScores(player, computer) {
  let playerDiv = document.querySelector("#player-score");
  let computerDiv = document.querySelector("#computer-score");

  playerDiv.textContent = player;
  computerDiv.textContent = computer;
}

function displayWinner(winner) {
  let winnerDiv = document.querySelector("#winnerboard");
  let win = (winner === "You") ? "win!" : "wins!";
  winnerDiv.textContent = winner.concat(" ", win);
  winnerDiv.style.padding = "10px";

  let scoreDivs = document.querySelectorAll(".score");
  scoreDivs.forEach(score => {
    if (parseInt(score.textContent) === pointsToWin) {
      score.classList.add("winner");
    }
  });
}

function togglePlayAgain(visibility) {
  let buttonDiv = document.querySelector(".play-again");
  buttonDiv.style.visibility = visibility;
}

function disableWeaponClick() {
  weapons.forEach(weapon => {
    weapon.style.color = "gray";
    weapon.style.cursor = "text";
  })
}

function computerPlay() {
  let result;
  let num = Math.random();
  if (num <= 0.33) {
    result = "rock";
  } else if (num <= 0.66) {
    result = "paper";
  } else {
    result = "scissors";
  }
  return result;
}

function playRound(playerSelection, computerSelection) {
  let player = playerSelection.toLowerCase();
  let computer = computerSelection.toLowerCase();
  let result;

  if (player === "rock") {
    if (computer === "scissors") {
      result = "win";
    } else if (computer === "paper") {
      result = "lose";
    } else {
      result = "tie";
    }
  } else if (player === "paper") {
    if (computer === "rock") {
      result = "win";
    } else if (computer === "scissors") {
      result = "lose";
    } else {
      result = "tie";
    }
  } else if (player === "scissors") {
    if (computer === "paper") {
      result = "win";
    } else if (computer === "rock") {
      result = "lose";
    } else {
      result = "tie";
    }
  } else {
    result = "invalid choice";
  }

  return result;
}

let weapons = document.querySelectorAll(".weapon");
weapons.forEach((weapon) => {
  weapon.addEventListener("click", (e) => {
    let roundResult;
    let winner;

    if (playerScore === pointsToWin ||
        computerScore === pointsToWin) {
      return;
    }

    weapon.classList.add("chosen-weapon");

    let playerWeapon = e.target.dataset.weapon;
    let computerWeapon = computerPlay();

    displayRoundWeapons(playerWeapon, computerWeapon);
    roundResult = playRound(playerWeapon, computerWeapon);

    if (roundResult === "win") {
      playerScore++;
      if (playerScore === pointsToWin) {
        winner = "You";
        isGameOver = true;
      }
    } else if (roundResult === "lose") {
      computerScore++;
      if (computerScore === pointsToWin) {
        winner = "Computer";
        isGameOver = true;
      }
    }

    displayScores(playerScore, computerScore);

    if (isGameOver) {
      displayWinner(winner);
      disableWeaponClick();
      togglePlayAgain("visible");
      isGameOver = false;
    }
  });

  weapon.addEventListener("transitionend", (e) => {
    weapon.classList.remove("chosen-weapon");
  });
});

let button = document.querySelector("#play-again button");
button.addEventListener("click", (e) => {
  let playerDiv = document.querySelector("#player-score");
  let computerDiv = document.querySelector("#computer-score");
  let winnerScoreDiv = document.querySelector(".winner");
  let playerWeaponDiv = document.querySelector("#player-weapon");
  let computerWeaponDiv = document.querySelector("#computer-weapon");
  let winnerDiv = document.querySelector("#winnerboard");

  weapons.forEach(weapon => {
    weapon.style.color = "black";
    weapon.style.cursor = "pointer";
  })

  playerScore = 0;
  computerScore = 0;
  playerDiv.textContent = playerScore;
  computerDiv.textContent = computerScore;
  winnerScoreDiv.classList.remove("winner");

  playerWeaponDiv.innerHTML = "";
  computerWeaponDiv.innerHTML = "";

  winnerDiv.textContent = "";
  winnerDiv.style.padding = "0px";

  togglePlayAgain("hidden");
});

const options = ["rock", "paper", "scissors"];
let computer;
let user;
let result;

let computerScore = 0;
let userScore = 0;
let UserScoreCounter = 0;
let ComputerScoreCounter = 0;

const scoreContainer = document.getElementById("score-container");
let userChoiceContainer = document.getElementsByClassName("user-choice-container")[0];
let computerChoiceContainer = document.getElementById("computer-choice-container");

const displayUserScore = document.getElementsByClassName("user-score")[1];
const displayComputerScore = document.getElementsByClassName("computer-score")[1];
const displayWinner = document.querySelector("#display-winner");

const heading = document.getElementsByClassName("title-container")[0];
const gameImage = document.getElementById("rock-paper-scissors-img");

let playBtn = document.getElementById("play-btn");
let newGameBtn = document.getElementById("new-game-btn");

let computerPaperIcon = document.getElementsByClassName("paper-icon")[1];
let computerRockIcon = document.getElementsByClassName("rock-icon")[1];
let computerScissorsIcon = document.getElementsByClassName("scissors-icon")[1];

let userPaperIcon = document.getElementsByClassName("paper-icon")[0];
let userRockIcon = document.getElementsByClassName("rock-icon")[0];
let userScissorsIcon = document.getElementsByClassName("scissors-icon")[0];
let questionMarkIcon = document.getElementById("question-mark-icon");

let userPaperChoice = document.getElementById("user-paper-choice");
let userScissorsChoice = document.getElementById("user-scissors-choice");
let userRockChoice = document.getElementById("user-rock-choice");

playBtn.addEventListener("click", function changePageForPlay() {

    heading.classList.add("hide");
    gameImage.classList.add("hide");

    scoreContainer.classList.remove("hide");
    scoreContainer.setAttribute("display-score", "1");

    displayWinner.setAttribute("display-winner", "1");
    displayUserScore.classList.remove("hide");
    displayComputerScore.classList.remove("hide");
    displayWinner.classList.remove("hide");

    userChoiceContainer.classList.remove("hide");
    computerChoiceContainer.classList.remove("hide");

    userScissorsChoice.classList.remove("hide");
    userPaperChoice.classList.remove("hide");
    userRockChoice.classList.remove("hide");

    playBtn.classList.add("hide");
    newGameBtn.classList.remove("hide");
    return;
});

function play() {

    computer = options[Math.floor(Math.random() * options.length)];
    console.log(computer);
    questionMarkIcon.style.display = "none";

    if (computer === "rock")
        return computerRockIcon.classList.remove("hide");


    if (computer === "scissors")
        return computerScissorsIcon.classList.remove("hide");


    if (computer === "paper")
        return computerPaperIcon.classList.remove("hide");

};

function findScore(userChoice) {

    if (userChoice === computer)
        return;

    if (userChoice === "rock" && computer === "scissors" || userChoice === "paper" && computer === "rock" || userChoice === "scissors" && computer === "paper")
        return userScore = 1;

    return computerScore = 1;
}

function findWinner() {

    if (computerScore > userScore) {
        result = "Computer wins!";
        ComputerScoreCounter++;
    } else if (computerScore < userScore) {
        result = "User wins!";
        UserScoreCounter++;
    } else {
        result = "It's a tie!";
    }
}

function displayResults() {

    displayUserScore.innerText = UserScoreCounter;
    displayComputerScore.innerText = ComputerScoreCounter;

    displayWinner.style.display = "flex";
    displayWinner.innerText = result;
    return;
}


userPaperChoice.addEventListener("click", () => {

    userRockChoice.classList.add("hide");
    userScissorsChoice.classList.add("hide");
    userPaperIcon.style.animationPlayState = "paused";
    play();
    findScore("paper");
    findWinner();
    displayResults();
    userScore = 0;
    computerScore = 0;
    return;
});

userScissorsChoice.addEventListener("click", () => {

    userPaperChoice.classList.add("hide");
    userRockChoice.classList.add("hide");
    userScissorsIcon.style.animationPlayState = "paused";
    play();
    findScore("scissors");
    findWinner();
    displayResults();
    userScore = 0;
    computerScore = 0;
    return;
});

userRockChoice.addEventListener("click", () => {

    userPaperChoice.classList.add("hide");
    userScissorsChoice.classList.add("hide");
    userRockIcon.style.animationPlayState = "paused";
    play();
    findScore("rock");
    findWinner();
    displayResults();
    userScore = 0;
    computerScore = 0;
    return;
});

newGameBtn.addEventListener("click", function () {

    userRockIcon.style.animationPlayState = "running";
    userPaperIcon.style.animationPlayState = "running";
    userScissorsIcon.style.animationPlayState = "running";

    userPaperChoice.classList.remove("hide");
    userScissorsChoice.classList.remove("hide");
    userRockChoice.classList.remove("hide");

    computerRockIcon.classList.add("hide");
    computerScissorsIcon.classList.add("hide");
    computerPaperIcon.classList.add("hide");

    questionMarkIcon.style.display = "block";
    questionMarkIcon.style.animationPlayState = "running";

    displayWinner.style.display = "none";
    return;
});






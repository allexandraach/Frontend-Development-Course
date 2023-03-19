let options = ["rock", "paper", "scissors"];
let computer;
let user;
let result;
let computerScore = 0;
let userScore = 0;

function play() {
    computer = options[Math.floor(Math.random() * options.length)];
    user = options[Math.floor(Math.random() * options.length)];
    console.log(`Computer's choice: ${computer} 
User's choice: ${user}`);
    getScore();
    findWinner();
    console.log(result);
}

function getScore() {

    if (user === computer)
        return;

    if (user === "rock" && computer === "scissors")
        return userScore = 1;

    if (user === "paper" && computer === "rock")
        return userScore = 1;

    if (user === "scissors" && computer === "paper")
        return userScore = 1;

    return computerScore = 1;
}

function findWinner() {
    if (computerScore > userScore) {
        result = "Computer wins!";
    } else if (computerScore < userScore) {
        result = "User wins!";
    } else {
        result = "It's a tie!";
    }
    return;
}

play();

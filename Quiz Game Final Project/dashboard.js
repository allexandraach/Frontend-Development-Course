
// const apiUsers = 'http://localhost:3000/users';
// const apiQuestionsEN = 'http://localhost:3000/questionsEN';


// function hideElem(toHide) {
//     toHide.classList.add("no-display");
//     return;
// };


// function displayElem(toDisplay) {
//     toDisplay.classList.remove("no-display");
//     return;
// }

class User {
    //  CLASS PROPERTIES TO BE MADE PRIVATE 

    username;
    password;
    email;

    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    register() {
        // REGISTER FUNCTIONALITY TO BE MOVED HERE
        // TO ADD COOKIE FUNCTIONALITY
    }

}

class LoggedUser extends User {
    username;
    password;

    constructor(username, password) {
        super();
        this.username = username;
        this.password = password;
    }

    login() {
        // LOGIN FUNCTIONALITY TO BE MOVED HERE

    }

    deleteAccount() {

        fetch(`${apiUsers}?username=${this.username}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.LoggedUser)
        })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.log('Error: ' + error))
    }

    // TO CREATE GET & SET METHODS
}


// DASHBOARD PAGE

const currentLoggedUser = JSON.parse(localStorage.getItem("currentloggedUser"));
const loggedUser = new LoggedUser(currentLoggedUser.username, currentLoggedUser.password);

function toggle(dropdownNo) {
    const dropdownContainer = document.getElementsByClassName("dropdown-container")[dropdownNo];
    const selectedButton = document.getElementsByClassName("dropdown-btn")[dropdownNo];

    dropdownContainer.classList.toggle("no-display");
    dropdownContainer.classList.toggle("active-dropdown");
    selectedButton.classList.toggle("bold");

}


// CHANGE THEME

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }

}



// DELETE ACCOUNT - doesn't work because the error 'DELETE http://localhost:3000/users?username=alexaach 404
//  (Not Found) occurs'; TO SOLVE THIS PROBLEM IN THE FUTURE

const deleteAccountBtn = document.getElementById('deleteAccBtn');

deleteAccountBtn.addEventListener("click", () => {

    loggedUser.deleteAccount();

}
)

// LOGOUT

const logOutBtn = document.getElementById('logOutBtn');

logOutBtn.addEventListener("click", () =>
    // NOT IDEAL; TO BE IMPROVED IN THE FUTURE
    location.href = "../login/home.html"
);


// I WANT TO PLAY

const startQuizBtn = document.getElementById("startQuizBtn");
const playBtnContainer = document.getElementById("playBtnContainer");
const playBtn = document.getElementById("playBtn");
const userChoicesContainer = document.getElementById("userChoicesContainer");
const findResultBtn = document.getElementById("findResultBtn");

playBtn.addEventListener("click", () => {

    displayElem(userChoicesContainer);
    displayElem(startQuizBtn);
    hideElem(playBtnContainer);


});

// START QUIZ

let countdown;

function startCountdown(seconds) {
    let countdownValue = seconds + 1;
    // WORKS, BUT WILL HAVE TO MODIFY OTHER THINGS TO OBTAIN THE INTENDED BEHAVIOUR AND ASPECT;
    //  TO DO IN THE FUTURE
    // document.getElementById("countdownDuration").innerHTML = seconds;

    countdown = setInterval(() => {
        countdownValue--;

        // Update the countdown display
        document.getElementById("countdown").innerHTML = countdownValue;

        if (countdownValue === 1) {
            countdownValue = seconds + 1;
        }
    }, 1000);

}


let responsesFromUser = [];
let questionsContainer = document.getElementById('questionsContainer');

// THIS PART NEEDS TO BE BETTER ORGANIZED IN THE FUTURE; HARD TO READ CODE; TO MOVE SEVERAL FUNCTIONALITIES FROM 
// displayQuestion FUNCTION TO OTHER FUNCTIONS WHICH WILL BE CALLED INSIDE displayQuestion function TO MAKE
// THE CODE EASIER TO FOLLOW & READ

function displayQuestion(data, currentIndex = 0) {

    // timeOutDuration will be used to change the duration of the timeour dynamically based on the category
    // selected by the user
    let timeOutDuration;


    if (difficultyFromUser === "Easy") {
        startCountdown(13);
        timeOutDuration = 13000;
    }

    if (difficultyFromUser === "Medium") {
        startCountdown(10);
        timeOutDuration = 10000;
    }

    if (difficultyFromUser === "Hard") {
        startCountdown(8);
        timeOutDuration = 8000;
    }

    if (currentIndex < data.length - 1) {

        const currentQuestion = data[currentIndex];

        // flag to keep track of whether user selected a radio button or not
        let userSelected = false;

        // flag to keep track of whether time is over or not
        let TimeOver = false;

        // Create question paragraph and add to the questions container
        const questionsParagraph = document.createElement('p');
        const shownQuestions = document.createTextNode(currentQuestion.question);
        questionsParagraph.append(shownQuestions);
        questionsParagraph.setAttribute("id", "quizQuestion");

        questionsContainer.appendChild(questionsParagraph);

        // Create responses paragraph and add to the questions container
        const responsesParagraph = document.createElement('p');

        let shownResponses = [];
        let radioButtons = [];

        // Add response options to the responses paragraph
        for (let i = 0; i < currentQuestion.responses.length; i++) {
            shownResponses = document.createTextNode(currentQuestion.responses[i].response);
            radioButtons[i] = document.createElement("input")
            radioButtons[i].setAttribute("type", "radio");
            radioButtons[i].setAttribute("name", "options");
            radioButtons[i].setAttribute("value", currentQuestion.responses[i].response);
            //   event listener to each radio button to modify the flag when the user clicks on a radio button. 
            radioButtons[i].addEventListener('change', () => {
                userSelected = true; // set the flag to true when user selects a radio button
            });
            responsesParagraph.append(shownResponses, radioButtons[i]);
        }
        document.getElementById('questionsContainer').appendChild(responsesParagraph);

        // Set a timeout to display the next question after 8 seconds

        const nextQuestion = setTimeout(() => {

            if (userSelected) {
                // If the user has a radio button selected when the time to answer the question passed,
                // search for that selected radio button and push its value to the responsesFromUser array
                const selectedButton = radioButtons.find((button) => button.checked);
                responsesFromUser.push(selectedButton.value);
                console.log(responsesFromUser);
            }


            // Remove the current question and responses from the questions container
            document.getElementById('questionsContainer').removeChild(questionsParagraph);
            document.getElementById('questionsContainer').removeChild(responsesParagraph);

            // Display the next question and if all questions have been displayed, show button to find result

            if (currentIndex < data.length - 1) {
                displayQuestion(data, currentIndex + 1);

            }

        }, timeOutDuration);
    }

    if (currentIndex >= data.length - 1) {
        clearInterval(countdown);
        hideElem(questionsContainer);
        displayElem(findResultBtn);

    }


};

findResultBtn.addEventListener("click", () => {

    // TO BE USED IN THE FUTURE TO IMPLEMENT THE FUNCTIONALITY TO VIEW PREVIOUS
    // QUIZZES 
    const dateOfQuiz = new Date();
    let timeOfQuiz = dateOfQuiz.getTime();
    console.log(dateOfQuiz, timeOfQuiz);

// FIND USER'S SCORE

const userScoreContainer = document.getElementById("userScoreContainer");
const showUserScore = document.getElementById("showUserScore");

//filters only the string responses which have the isCorrect property set to
// true and therefore are the correct answers to the questions

    const correctResponses = quizfromDatabase.map(obj => obj.responses.find(resp => resp.isCorrect).response);

    console.log('correctAnswers:', correctResponses);

    const userCorrectAnswers = responsesFromUser.filter(ans => correctResponses.includes(ans));

    console.log('matchingAnswers:', userCorrectAnswers);

    const userScore = userCorrectAnswers.length + 1;

    console.log('Your score is:', userScore);

    displayElem(userScoreContainer);
    showUserScore.innerText = userScore;
    hideElem(findResultBtn);

// NOT WORKING; TO DO

    playBtn.textContent = "Start new game";
    

}

)

let categoryFromUser = document.getElementById('categoryFromUser')
let difficultyFromUser = document.getElementById('difficultyFromUser');
const quizfromDatabase = [];


startQuizBtn.addEventListener("click", () => {

    hideElem(userChoicesContainer);
    hideElem(startQuizBtn);

    categoryFromUser = categoryFromUser.value;
    difficultyFromUser = difficultyFromUser.value;

    fetch(`${apiQuestionsEN}?difficulty=${difficultyFromUser}&category=${categoryFromUser}`)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            quizfromDatabase.push(...json);
            displayQuestion(json);

        })

});

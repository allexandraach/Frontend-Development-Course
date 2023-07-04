
const apiUsers = 'http://localhost:3000/users';
const apiQuestionsEN = 'http://localhost:3000/questionsEN';

function hideElem(toHide) {
    toHide.classList.add("no-display");
    return;
};

function displayElem(toDisplay) {
    toDisplay.classList.remove("no-display");
    return;
}

function redirect(filename) {
    location.href = filename +".html";
}

// doesn't work; will use Local Storage for now

// function setCookie(cname, cvalue, exdays) {
//     const d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     let expires = "expires=" + d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(name) {
//     const cookieName = `${name}=`;
//     const cookieArray = document.cookie.split(';');
//     for (let i = 0; i < cookieArray.length; i++) {
//         let cookie = cookieArray[i];
//         while (cookie.charAt(0) === ' ') {
//             cookie = cookie.substring(1);
//         }
//         if (cookie.indexOf(cookieName) === 0) {
//             return decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
//         }
//     }
//     return null;
// }

// LOGIN PAGE

class User {
    username;
    password;
    email;

    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    register() {
    }

    login() {
        fetch(`${apiUsers}?username=${this.username}`)
            .then(response => { return response.json() })
            .then(data => { checkData(data)})
            .catch(error => console.log('Error: ' + error))
    }

}

class LoggedUser extends User {

    constructor(username, password, email) {
        super(username, password, email);
    }

    changeUsername() {

    }

    changePassword() {

    }


    deleteAccount() {

        fetch(`${apiUsers}?username=${currentUser.username}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.user)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log('Error: ' + error))
    }

    // getEmail() {
    //     return this.#email;
    // }

    // getUsername() {
    //     return this.#username;
    // }

    // getPassword() {
    //     return this.#password;
    // }

    // setEmail(email) {
    //     return this.#email;
    // }

    // setUsername(username) {
    //     return this.#username;
    // }

    // setPassword(password) {
    //     return this.#password;
    // }

    // }
}


const loginBtn = document.getElementsByClassName("btn btn-primary btn-block fa-lg gradient-custom-2 mb-3")[0];
const loginForm = document.getElementById("loginFormContainer");

// LOGIN TO ACCOUNT

// FUTURE IMPROVEMENT: FORGOT YOUR PASSWORD FUNCTIONALITY 

let currentUser;

function checkData(serverData) {

    if (serverData[0].username === currentUser.username && serverData[0].password === currentUser.password) {
        alert("Login successfully!")
        currentUser = new LoggedUser(currentUser.username, currentUser.password);
        console.log(currentUser);
        localStorage.setItem("username", currentUser.username);
        localStorage.setItem("password", currentUser.password);
        redirect("dashboard");

    } else {
        alert("Login failed!")
    }
}

if (loginBtn) {
    loginBtn.addEventListener("click", () => {

        const usernameFromUser = document.getElementById("form2Example11").value;
        const passwordFromUser = document.getElementById("form2Example22").value;

        currentUser = new User(usernameFromUser, passwordFromUser);

        currentUser.login();

    })
};

// REGISTER ACCOUNT

const createAccountBtn = document.getElementsByClassName("btn btn-outline-danger")[0];

if (createAccountBtn) {
    createAccountBtn.addEventListener("click", () => {
        hideElem(loginForm);
        displayElem(registerForm);

    })
};


const registerForm = document.getElementById("registerContainer");
const registerBtn = document.getElementById("registerBtn");
const termsOfServiceBtn = document.getElementById("form2Example3cg");

let newUser;
let newUsername;
let newEmail;
let newPassword;
let repeatedPassword;

if (registerBtn) {
    registerBtn.addEventListener("click", () => {

        newUsername = document.getElementById("form3Example1cg").value;
        newEmail = document.getElementById("form3Example3cg").value;
        newPassword = document.getElementById("form3Example4cg").value;
        repeatedPassword = document.getElementById("form3Example4cdg").value;
        let isValid;

        if (newPassword !== repeatedPassword) {
            alert("Inserted passwords do not match!");
        } else {
            isValid = true;
        }

        if (!termsOfServiceBtn.checked) {
            alert("To create an account, you must agree to the Terms of Service.");
        } else {
            isValid = true;
        }

        if (newUsername.length == 0 || newEmail.length == 0 || newPassword.length == 0 ||
            repeatedPassword == 0) {
            alert("Please fill in all the fields!");
        } else {
            isValid = true;
        }

        // future improvements: verify that username and email are not taken

        if (isValid) {
            newUser = new User(newUsername, newPassword, newEmail);
            console.log(newUser);

            fetch(`${apiUsers}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    alert("Account created successfully!");
                    redirect("dashboard");
                }
                )
                .catch(error => console.log('Error: ' + error))


        }

    }
    )
};

// BACK TO LOGIN PAGE

const loginHereBtn = document.getElementById("loginHereBtn");

if (loginHereBtn) {
    loginHereBtn.addEventListener("click", () => {
        hideElem(registerForm);
        displayElem(loginForm);
    }
    )
};


// DASHBOARD PAGE

// DISPLAY USERNAME ON DASHBOARD PAGE TO WELCOME USER

const displayUsername = document.getElementById("displayUsername");
displayUsername.textContent = localStorage.getItem("username");



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

// DELETE ACCOUNT

const deleteAccountBtn = document.getElementById('deleteAccBtn');

if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", () => {

        if (confirm("Are you sure you want to delete your account?") == true) {
            currentUser = new LoggedUser (localStorage.getItem("username"), localStorage.getItem("password"));
            currentUser.deleteAccount();
        } else {
            alert("Your account won't be deleted.")
        }

    }
    )
};

// LOGOUT

const logOutBtn = document.getElementById('logOutBtn');

if (logOutBtn) {
    logOutBtn.addEventListener("click", () =>
    redirect("home")
)};


// I WANT TO PLAY

const startQuizBtnContainer = document.getElementById("startQuizBtnContainer");
const playBtnContainer = document.getElementById("playBtnContainer");
const playBtn = document.getElementById("playBtn");
const userChoicesContainer = document.getElementById("userChoicesContainer");
const findResultBtnContainer = document.getElementById("findResultBtnContainer");

if (playBtn) {
    playBtn.addEventListener("click", () => {

        displayElem(userChoicesContainer);
        displayElem(startQuizBtnContainer);
        hideElem(playBtnContainer);


    })
};

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

    // timeOutDuration will be used to change the duration of the timeout dynamically
    //  based on the category selected by the user
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
        displayElem(findResultBtnContainer);

    }


};

const findResultBtn = document.getElementById("findResultBtn");

if (findResultBtn) {
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

        const correctResponses = quizFromDatabase.map(obj => obj.responses.find(resp => resp.isCorrect).response);

        const userCorrectAnswers = responsesFromUser.filter(ans => correctResponses.includes(ans));

        const userScore = userCorrectAnswers.length + 1;

        displayElem(userScoreContainer);
        showUserScore.innerText = userScore;
        hideElem(findResultBtnContainer);

        // NOT WORKING; TO DO

        playBtn.textContent = "Start new game";

    })};

    let categoryFromUser = document.getElementById('categoryFromUser')
    let difficultyFromUser = document.getElementById('difficultyFromUser');
    const quizFromDatabase = [];

    const startQuizBtn = document.getElementById("startQuizBtn");


    if (startQuizBtn) {startQuizBtn.addEventListener("click", () => {

        hideElem(userChoicesContainer);
        hideElem(startQuizBtn);

        categoryFromUser = categoryFromUser.value;
        difficultyFromUser = difficultyFromUser.value;

        fetch(`${apiQuestionsEN}?difficulty=${difficultyFromUser}&category=${categoryFromUser}`)
            .then(response => response.json())
            .then(json => {
                quizFromDatabase.push(...json);
                displayQuestion(json);

            });

    })};


import User from './script.js';

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

// DASHBOARD PAGE

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

deleteAccountBtn.addEventListener( "click", () => {
    this.user.deleteAccount();



}


)




// LOGOUT

const logOutBtn = document.getElementById('logOutBtn');

logOutBtn.addEventListener("click", () => 
    location.href ="../login/home.html"
);


// I WANT TO PLAY

const startQuizBtn = document.getElementById("startQuizBtn");
const playBtnContainer = document.getElementById("playBtnContainer");
const playBtn = document.getElementById("playBtn");
const userChoicesContainer = document.getElementById("userChoicesContainer");

playBtn.addEventListener("click", () => {

    displayElem(userChoicesContainer);
    displayElem(startQuizBtn);
    hideElem(playBtnContainer);


});

// START QUIZ

function displayQuestion(data, currentIndex = 0) {
    const currentQuestion = data[currentIndex];
  
    // Create question paragraph and add to the questions container
    const questionsParagraph = document.createElement('p');
    const shownQuestions = document.createTextNode(currentQuestion.question);
    questionsParagraph.append(shownQuestions);
    questionsParagraph.setAttribute("id", "quizQuestion");
    
    document.getElementById('questionsContainer').appendChild(questionsParagraph);
  
    // Create responses paragraph and add to the questions container
    const responsesParagraph = document.createElement('p');
    let shownResponses = [];
    let radioButtons;
  
    // Add response options to the responses paragraph
    for (let i = 0; i < currentQuestion.responses.length; i++) {
      shownResponses = document.createTextNode(currentQuestion.responses[i].response);
      radioButtons = document.createElement("input")
      radioButtons.setAttribute("type", "radio");
      radioButtons.setAttribute("name", "options");
      radioButtons.setAttribute("value", currentQuestion.responses[i].response);
      responsesParagraph.append(shownResponses, radioButtons);
    }
    document.getElementById('questionsContainer').appendChild(responsesParagraph);
  
    // Set a timeout to display the next question after 8 seconds
    if (currentIndex < data.length - 1) {
      setTimeout(() => {

        if (radioButtons.checked) {
            fetch(apiUsers, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(radioButtons.checked.value)
            })
                .then(response => response.json())
                .then(choice => console.log(choice))
                .catch(error => console.log('Error: ' + error))
        }

        // Remove the current question and responses from the questions container
        document.getElementById('questionsContainer').removeChild(questionsParagraph);
        document.getElementById('questionsContainer').removeChild(responsesParagraph);
  
        // Display the next question
        displayQuestion(data, currentIndex + 1);
      }, 8000);
    }
  };

// function displayQuestion(data) {
//     let questionIndex = 0;
//     const questionsContainer = document.getElementById('questionsContainer');

//     // stop the interval after all the questiosn have been displayed
//     let intervalId = setInterval(() => {
//         if (questionIndex >= data.length) {
//             clearInterval(intervalId);
//             return;
//         }

//         const question = data[questionIndex];

//          // Create question paragraph and add to the questions container
//         const questionsParagraph = document.createElement('p');
//         const shownQuestions = document.createTextNode(question.question);
//         questionsParagraph.append(shownQuestions);

//          // Create responses paragraph and add to the questions container
//         const responsesParagraph = document.createElement('p');
        
        

//         // Add response options to the responses paragraph

//         let shownResponses = [];
//         let radioButtons;
//         for (let index = 0; index < question.responses.length; index++) {
//             shownResponses = document.createTextNode(question.responses[index].response);
//             radioButtons = document.createElement("input")
//             radioButtons.setAttribute("type", "radio");
//             radioButtons.setAttribute("name", "options");
//             radioButtons.setAttribute("value", question.responses[index].response);
//             responsesParagraph.append(shownResponses, radioButtons);
//         }

//         questionsContainer.appendChild(questionsParagraph);
//         questionsContainer.appendChild(responsesParagraph);
        
//         setTimeout(() => {
//             questionsContainer.removeChild(questionsParagraph);
//             questionsContainer.removeChild(responsesParagraph);
//         }, 8000);
        
//         questionIndex++;
//     }, 8000);
// }

// function displayQuestion(data) {

//     data.forEach((question, index) => {
//         const questionsParagraph = document.createElement('p');
//         const responsesParagraph = document.createElement('p');
//         const shownQuestions = document.createTextNode(question.question);

//         if (index % 2 === 0)
//             questionsParagraph.style.backgroundColor = 'gray';

//             questionsParagraph.append(shownQuestions);

//             let shownResponses = [];
//             let radioButtons;

//             for (let index = 0; index < question.responses.length; index++) {
//                 shownResponses = document.createTextNode(question.responses[index].response);
//                 radioButtons = document.createElement("input")
//                 radioButtons.setAttribute("type", "radio");
//                 radioButtons.setAttribute("name", "options");
//                 responsesParagraph.append(shownResponses, radioButtons);

//             }
        
//         document.getElementById('questionsContainer').appendChild(questionsParagraph);
//         document.getElementById('questionsContainer').appendChild (responsesParagraph);
//     })
    
// };

let categoryFromUser = document.getElementById('categoryFromUser')
let difficultyFromUser = document.getElementById('difficultyFromUser');


startQuizBtn.addEventListener("click", () => {

    hideElem(userChoicesContainer);
    hideElem(startQuizBtn);

    categoryFromUser = categoryFromUser.value;
    difficultyFromUser = difficultyFromUser.value;
    
    fetch(`${apiQuestionsEN}?difficulty=${difficultyFromUser}&category=${categoryFromUser}`)
        .then(response => response.json())
    .then(json => {
        console.log(json);
        displayQuestion(json)
    })
    // .catch(error => console.log('Error: ' + error));

    // fetch(`${apiQuestionsEN}?_limit=10`)
    //     .then(response => response.json())
    // .then(json => {
    //     console.log(json);
    //     displayQuestion(json)
    // })
    // .catch(error => console.log('Error: ' + error));
       
});

// function generateQuiz (selectedDifficulty, selectedCategory) {

//     fetch(`${apiQuestionsEN}?difficulty=${difficultyFromUser}&category=${categoryFromUser}`)
//         .then(response => response.json())
//     .then(json => {
//         console.log(json);
//         displayQuestion(json)
//     })
//     .catch(error => console.log('Error: ' + error));
    
// }

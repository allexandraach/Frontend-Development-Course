
const apiURLQuestions = "http://localhost:3000/questionsEN";
const dataFromUser = document.getElementsByClassName("input");

// LOAD QUESTIONS
// NOT WORKING

const loadBtn = document.getElementById("load-btn");

loadBtn.addEventListener("click", () => {
    document.getElementById("form").style.display = "none";

    fetch('http://localhost:3000/questionsEN?_limit=10')
        .then(response => { console.log(response.json()) })
        .then(json => {
            for (let index = 0; index < json.length; index++) {
                const paragraph = document.createElement('p');
                const textContent = document.createTextNode(questions[index].question);
                paragraph.append(textContent);

                if (index % 2 === 0)
                    paragraph.style.backgroundColor = 'gray';
                document.getElementById('containerID').appendChild(paragraph);
            }
        })

        .catch(error => console.log('Error: ' + error));


})

class DatabaseObject {
    id;
    question;
    difficulty;
    category;
    responses;

    constructor(id, question, difficulty, category, responses) {
        this.id = id;
        this.question = question;
        this.difficulty = difficulty;
        this.category = category;
        this.responses = responses;
    }

}


// ADD QUESTIONS

const addButton = document.getElementById("add-btn");

addButton.addEventListener("click", () => {

    const newQuestion = [];
    const responsesArray = [];


    for (let index = 0; index < dataFromUser.length; index++) {
        if (index < 5) {
            newQuestion.push(dataFromUser[index].value)
        }
        else {
            responsesArray.push(dataFromUser[index].value)
        }
    };

    console.log(newQuestion);
    console.log(responsesArray);

    const newQuestionFromUser = new DatabaseObject(newQuestion[0], newQuestion[1], newQuestion[2], newQuestion[3], responsesArray);
    console.log(newQuestionFromUser);

    fetch(`${apiURLQuestions}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify((newQuestionFromUser))
    })
        .then(response => response.json())
        .then(question => console.log(question))
        .catch(error => console.log('Error: ' + error))

});



// EDIT QUESTION

const editBtn = document.getElementById("edit-btn");

editBtn.addEventListener("click", () => {


    const updateQuestion = [];
    const responsesArray = [];

    for (let index = 0; index < dataFromUser.length; index++) {
        if (index < 5) {
            updateQuestion.push(dataFromUser[index].value)
        }
        else {
            responsesArray.push(dataFromUser[index].value)
        }
    }

    console.log(updateQuestion);
    console.log(responsesArray);


    const updateFromUser = new DatabaseObject(updateQuestion[0], updateQuestion[1], updateQuestion[2], updateQuestion[3], responsesArray);
    console.log(updateFromUser);

    fetch(`${apiURLQuestions}/${updateFromUser.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateFromUser)
    })
        .then(response => response.json())
        .then(question => console.log(question))
        .catch(error => console.log('Error: ' + error))

});



// DELETE QUESTION
// NOT SURE IT WORKS BUT MOST PROBABLY NOT :(

const deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener("click", () => {

    fetch(`${apiURLQuestions}/${dataFromUser[0].value}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))

});












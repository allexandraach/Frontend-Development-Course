// in the file I wrote all the code that is global and that I will use across the  multiple js files in my project


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

// make these variables and functions available across all js files

window.apiUsers = apiUsers;
window.apiQuestionsEN = apiQuestionsEN;

window.displayElem = displayElem;
window.hideElem = hideElem;

// class User {
//     username;
//     password;
//     email;

//     constructor(username, password, email) {
//         this.username = username;
//         this.password = password;
//         this.email = email;
//     }

// login() {


// }

//     deleteAccount(){

//     fetch(`${apiUsers}?username=${this.loggedUser.username}`, {
//         method: "DELETE",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(this.user)
//     })
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.log('Error: ' + error))
//     }}


// export default 

// class User {
//     username;
//     password;
//     email;

//     constructor(username, password, email) {
//         this.username = username;
//         this.password = password;
//         this.email = email;
//     }

//     deleteAccount(){

//     fetch(`${apiUsers}`, {
//         method: "DELETE",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(this.user)
//     })
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.log('Error: ' + error))
//     }

    

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

    //     login {

    // }

// }
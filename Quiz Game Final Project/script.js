const userInDatabase = 'http://localhost:3000/users';

const loginBtn = document.getElementsByClassName("btn btn-primary btn-block fa-lg gradient-custom-2 mb-3")[0];
const createAccountBtn = document.getElementsByClassName("btn btn-outline-danger")[0];
const registerForm = document.getElementById("registerContainer");
const loginForm = document.getElementById("loginFormContainer");
const registerBtn = document.getElementById("registerBtn");

let data;


loginBtn.addEventListener("click", () => {
    // const dataFromUser = new User(usernameFromUser, passwordFromUser)

    const usernameFromUser = document.getElementById("form2Example11").value;
    const passwordFromUser = document.getElementById("form2Example22").value;

    fetch(`${userInDatabase}?username=${usernameFromUser}&password=${passwordFromUser}`)
        .then(response => { console.log(response.json()) })
        .then(data => { checkData(JSON.parse(data)) })
        .catch(error => console.log('Error: ' + error));

    hideElem();
})

function checkData(serverData) {

    if (serverData.includes(usernameFromUser, passwordFromUser)) {
        alert("Login successfully!")
    } else {
        alert("Login failed!")
    }
}


createAccountBtn.addEventListener("click", () => {
    hideElem(loginForm);
    displayElem(registerForm);

});


function hideElem(toHide) {
    toHide.style.display = "none";
    return;
};

function displayElem(toDisplay) {
    toDisplay.classList.remove("no-display");
}

function register() {

}

function login() {

}


class User {
    #username;
    #password;
    #email;

    constructor(username, password, email) {
        this.#email = email;
        this.#username = username;
        this.#password = password;
    }


    getUsername() {
        return this.#username;
    }

    getPassword() {
        return this.#password;
    }

    login(username, password) {
        if (username === this.username && password === this.password) {
            return alert("Login successfully");
        } else {
            return alert("Login failed");
        }
    }
}

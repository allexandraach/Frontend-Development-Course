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

}

class LoggedUser {
    username;
    password;

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    login() {

    }

    deleteAccount() {

        fetch(`${apiUsers}?username=${this.username}`, {
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
}


const loginBtn = document.getElementsByClassName("btn btn-primary btn-block fa-lg gradient-custom-2 mb-3")[0];
const loginForm = document.getElementById("loginFormContainer");

// LOGIN TO ACCOUNT

let currentUser;


function checkData(serverData) {

    if (serverData[0].username === usernameFromUser && serverData[0].password === passwordFromUser) {
        alert("Login successfully!")
        location.href = "../dashboard/dashboard.html"
        currentUser = new LoggedUser(usernameFromUser, passwordFromUser);
        localStorage.setItem("currentloggedUser", JSON.stringify(currentUser));
    } else {
        alert("Login failed!")
    }
}

let usernameFromUser = document.getElementById("form2Example11");
let passwordFromUser = document.getElementById("form2Example22");

loginBtn.addEventListener("click", () => {

    usernameFromUser = usernameFromUser.value;
    passwordFromUser = passwordFromUser.value;

    fetch(`${apiUsers}?username=${usernameFromUser}`)
        .then(response => { return response.json() })
        .then(data => { checkData(data) })
        .catch(error => console.log('Error: ' + error));

})

// REGISTER ACCOUNT

// import User from './script.js';


const createAccountBtn = document.getElementsByClassName("btn btn-outline-danger")[0];

createAccountBtn.addEventListener("click", () => {
    hideElem(loginForm);
    displayElem(registerForm);

});


const registerForm = document.getElementById("registerContainer");
const registerBtn = document.getElementById("registerBtn");
const termsOfServiceBtn = document.getElementById("form2Example3cg");

let newUser;
let newUsername;
let newEmail;
let newPassword;
let repeatedPassword;

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
        alert("To created an account, you must agree to the Terms of Service.");
    } else {
        isValid = true;
    }

    if (newUsername.length == 0 || newEmail.length == 0 || newPassword == 0 ||
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
            .then(data => console.log(data))
            .catch(error => console.log('Error: ' + error))

        alert("Account created successfully!");
        location.href = "../dashboard/dashboard.html";

    }

}
);

// BACK TO LOGIN PAGE

const loginHereBtn = document.getElementById("loginHereBtn");

loginHereBtn.addEventListener("click", () => {
    hideElem(registerForm);
    displayElem(loginForm);
}
);

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBlkV6uH6Xum1XemTSXu8iX4IHJyFwBygE",
    authDomain: "learning-system-2d77c.firebaseapp.com",
    databaseURL: "https://learning-system-2d77c.firebaseio.com",
    projectId: "learning-system-2d77c",
    storageBucket: "learning-system-2d77c.appspot.com",
    messagingSenderId: "645352697427",
    appId: "1:645352697427:web:c6a6ebdef072df03ade0a6",
    measurementId: "G-0K6LJ79XVW"
};

var resgetsterApp = firebase.initializeApp(firebaseConfig, "regester");
var regesterdb = resgetsterApp.database();

// Check the Sidebar extented or not (default: false)
var extented = false;

// Function to make the sidebar extent (pop out)
function collaspeSidebar() {
    if (!extented) {
        // Change the sidebar width and extent to 180px
        document.getElementById("mySidebar").style.width = "180px";
        this.extented = true;
    } else {
        // Change the sidebar width and close to 50px
        document.getElementById("mySidebar").style.width = "50px";
        this.extented = false;
    }
}
// End of Function: collaspeSidebar()

// Get Current HTML Page Name
var fileName = location.pathname.split("/").slice(-1);
console.log(fileName[0]);

// Things to be load after the window loading
window.onload = function () {
    var bntHome = document.getElementById("home");
    // Action after clicking the "Home" anchor
    bntHome.onclick = function () {
        // Direct to "system.html"
        if (fileName[0] !== "system.html") {
            document.location.href = 'system.html';
        }
    }
    // End of Action after clicking the "New Account" anchor

    var bntNewStuAcc = document.getElementById("newStuAcc");
    // Action after clicking the "New Account" anchor
    bntNewStuAcc.onclick = function () {
        // Direct to "newstuacc.html"
        document.location.href = 'newstuacc.html';
    }
    // End of Action after clicking the "New Question" anchor

    var bntNewQt = document.getElementById("newqt");
    // Action after clicking the "New Question" anchor
    bntNewQt.onclick = function () {
        // Direct to "newqt.html"
        document.location.href = 'newqt.html';
    }
    // End of Action after clicking the "New Question" anchor

    if (fileName[0] === "newstuacc.html") {
        var reset = document.getElementById("redoBnt");
        var create = document.getElementById("signUpBnt");

        reset.addEventListener('click', function () {
            // Confirm to erease all the input
            if (confirm("This action will remove all inputed items")) {
                reform();
            }
        })

        create.addEventListener('click', function () {
            createAcc();
        })
    }
}

function createAcc() {
    var stuName = document.getElementById("stuName").value;
    var stuId = document.getElementById("stuId").value;
    var stuEmail = document.getElementById("stuEmail").value;
    var stuPwd = document.getElementById("stuPwd").value;
    var stuComPwd = document.getElementById("stuComPwd").value;
    if (allFill(stuName, stuId, stuEmail, stuPwd, stuComPwd)) {
        console.log("All items filled");
        if (allValid(stuName, stuId, stuEmail, stuPwd, stuComPwd)) {
            console.log("All items are valid");
            regester(stuName, stuId, stuEmail, stuPwd);
            reform();
        }
    }
}

// Reset the input form
function reform() {
    document.getElementById("signUp").reset();
}
// End of function: reform

// Check if all the items have been filled
function allFill(name, id, email, pwd, compwd) {
    var unFillPart = "";
    var cnt = 0;

    // Check if student name have been filled or not
    if (name == "" && cnt === 0) {
        unFillPart += "1. Student Name\n";
        cnt++;
    } else if (name == "") {
        unFillPart += ++cnt + ". Student Name\n";
    }

    // Check if student ID have been filled or not
    if (id == "" && cnt === 0) {
        unFillPart += "1. Student ID\n";
        cnt++;
    }
    else if (id == "") {
        unFillPart += ++cnt + ". Student ID\n";
    }

    // Check if student Emsil have been filled or not
    if (email == "" && cnt === 0) {
        unFillPart += "1. Student Email\n";
        cnt++;
    } else if (email == "") {
        unFillPart += ++cnt + ". Student Email\n";
    }

    // Check if password have been filled or not
    if (pwd == "" && cnt === 0) {
        unFillPart += "1. Password\n";
        cnt++;
    } else if (pwd == "") {
        unFillPart += ++cnt + ". Password\n";
    }

    // Check if confirm password have been filled or not
    if (compwd == "" && cnt === 0) {
        unFillPart += "1. Confirm Password\n";
        cnt++;
    } else if (compwd == "") {
        unFillPart += ++cnt + ". Confirm Password\n";
    }

    // Check if there have any unfilled part(s)
    if (unFillPart !== "") {
        unFillMessage(unFillPart);
        return false;
    } else {
        return true;
    }
}
// End of function: allFill

// Function to display all the unfilled part(s) (if there have any)
function unFillMessage(unFillPart) {
    console.log(unFillPart);
    alert("Error, Account cannot be created.\nThe following item(s) have not been filled:\n" + unFillPart);
}
// End of function: unFillMessage

// Function to check if all the information are valid information
function allValid(name, id, email, pwd, compwd) {
    if (pwdValid(pwd, compwd) && emailValid(email) && nameValid(name) && idValid(id)) {
        return true;
    }
}
// End of function: allValid

// Function to check the password is same as the confirm password and is it greater than the min length
function pwdValid(pwd, compwd) {
    // Check if the password is same as the confirm password
    if (pwd !== compwd) {
        alert("Password and Confirm Password do not match");
        return false;
    }

    // Check if the password is greater than the min length
    if (!pwdLenCheck(pwd)) {
        return false;
    }

    return true;
}
// End of function: pwdValid

// Check if the password is greater than the min length
function pwdLenCheck(pwd) {
    if (pwd.length < 6) {
        alert("Password is too short (at least 6 characters).\n");
        return false;
    } else {
        return true;
    }
}
// End of function: pwdLenCheck


function emailValid(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    } else {
        alert("Error, It is an invalid email address.\nPlease fill in a valid email address\n");
        return false;
    }
}

function nameValid(name) {
    if (/^[a-zA-Z_\u4e00-\u9fa5 ]+$/.test(name)) {
        console.log("Name ok\n");
        return true;
    } else {
        console.log("Name not ok\n")
        alert("Error, invalid formate.\nPlease either fill in Chinese Name or English Name\n");
        return false;
    }
}

function idValid(id) {
    if (/^[a-zA-Z][a-zA-Z0-9]$/.test(id)) {
        return true;
    } else {
        alert("Error, invalid formate.\nPlease fill in Student ID with English Character(s) plus Numbers.\nE.g.s114514\n");
    }
}

function regester(name, id, email, pwd) {
    resgetsterApp.auth().createUserWithEmailAndPassword(email, pwd).then(function () {
        resgetsterApp.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("Account created uid:" + user.uid);
                regesterdb.ref('/users/' + user.uid + '/').set({
                    email: email,
                    name: name,
                    password: pwd,
                    role: "student",
                    uid: user.uid,
                    id: id
                });
            }
        })
    });
    resgetsterApp.auth().signOut();
}
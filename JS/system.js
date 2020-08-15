import {addQuestionToDatabase} from "./renderer.js";
import {genQuestionID} from "./renderer.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlkV6uH6Xum1XemTSXu8iX4IHJyFwBygE",
    authDomain: "learning-system-2d77c.firebaseapp.com",
    databaseURL: "https://learning-system-2d77c.firebaseio.com",
    projectId: "learning-system-2d77c",
    storageBucket: "learning-system-2d77c.appspot.com",
    messagingSenderId: "645352697427",
    appId: "1:645352697427:web:c6a6ebdef072df03ade0a6",
    measurementId: "G-0K6LJ79XVW"
};

let registerApp = firebase.initializeApp(firebaseConfig, "register");
let registerdb = registerApp.database();

// Get Current HTML Page Name
var fileName = location.pathname.split("/").slice(-1);
console.log(fileName[0]);

// Things to be load after the window loading
window.onload = function () {
    let bntHome = document.getElementById("home");
    // Action after clicking the "Home" anchor
    bntHome.onclick = function () {
        // Direct to "system.html"
        if (fileName[0] !== "system.html") {
            document.location.href = 'system.html';
        }
    }
    // End of Action after clicking the "New Account" anchor

    let bntNewStuAcc = document.getElementById("newStuAcc");
    // Action after clicking the "New Account" anchor
    bntNewStuAcc.onclick = function () {
        // Direct to "newstuacc.html"
        document.location.href = 'newstuacc.html';
    }
    // End of Action after clicking the "New Question" anchor

    let bntNewQt = document.getElementById("newqt");
    // Action after clicking the "New Question" anchor
    bntNewQt.onclick = function () {
        // Direct to "newqt.html"
        document.location.href = 'newqt.html';
    }
    // End of Action after clicking the "New Question" anchor

    if (fileName[0] === "newstuacc.html") {
        let reset = document.getElementById("redoBnt");
        let create = document.getElementById("signUpBnt");

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

    if (fileName[0] === "newqt.html") {
        showQusetionNumber();
        clearTextArea();
        let nextStep = document.getElementById("nextBnt");

        nextStep.addEventListener('click', function () {
            chooseType();
        })

    }
}

function createAcc() {
    let stuName = document.getElementById("stuName").value;
    let stuId = document.getElementById("stuId").value;
    let stuEmail = document.getElementById("stuEmail").value;
    let stuPwd = document.getElementById("stuPwd").value;
    let stuComPwd = document.getElementById("stuComPwd").value;
    if (allFill(stuName, stuId, stuEmail, stuPwd, stuComPwd)) {
        console.log("All items filled");
        if (allValid(stuName, stuId, stuEmail, stuPwd, stuComPwd)) {
            console.log("All items are valid");
            register(stuName, stuId, stuEmail, stuPwd);
            reform();
        }
    }
}

// Reset the input form
function reform() {
    if (fileName[0] === "newstuacc.html") {
        document.getElementById("signUp").reset();
    } /*else if (fileName[0] === "newqt.html") {
        console.log("reformed");
        var v = document.getElementById("qtType");
        var qtNum = document.getElementById("qtNumber");
        var nextAct = document.getElementById("nextqtBnt");
        v.style.display = "block";
        qtNum.style.display = "block";
        nextAct.innerHTML = "Next Question";
        nextAct.style.display = "none";
        document.getElementById("nextBnt").style.display = "block";
    }*/
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
    } else if (id == "") {
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
    return pwdLenCheck(pwd);


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
        console.log("Name ok\n");//For Debug
        return true;
    } else {
        console.log("Name not ok\n")//For Debug
        alert("Error, invalid format.\nPlease either fill in Chinese Name or English Name\n");
        return false;
    }
}

function idValid(id) {
    if (/^[a-zA-Z][a-zA-Z0-9]+$/.test(id)) {
        return true;
    } else {
        alert("Error, invalid format.\nPlease fill in Student ID with English Character(s) plus Numbers.\nE.g.s114514\n");
    }
}

function register(name, id, email, pwd) {
    registerApp.auth().createUserWithEmailAndPassword(email, pwd).then(function () {
        registerApp.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("Account created uid:" + user.uid);
                registerdb.ref('/users/' + user.uid + '/').set({
                    email: email,
                    name: name,
                    password: pwd,
                    role: "student",
                    uid: user.uid,
                    id: id
                });
                alert("Account of ID:" + id + " Name: " + name + " created successfully\n");
            }
        })
    });
    registerApp.auth().signOut();
}

// show the number of questions that the teacher want to make 
function showQusetionNumber() {
    var v = document.getElementById("qtType");
    console.log(v.selectedIndex);
    if (v.selectedIndex == 0) {
        document.getElementById("qtNumber").style.display = "block";
    } else {
        document.getElementById("qtNumber").style.display = "none";
    }
}

// End of function showQusetionNumber

// Choose the type of quiz the teacher want to set
function chooseType() {
    const v = document.getElementById("qtType");
    const qtNum = document.getElementById("qtNumber");
    const qtSubject = document.getElementById("qtSubject");
    let num, type, subject;
    if (v.selectedIndex == 0) {
        num = qtNum.value;
        type = "task";
    } else {
        num = 1;
        type = "practise";
    }
    subject = qtSubject.options[qtSubject.selectedIndex].text;
    let questionID = genQuestionID(subject, type);
    showQuestionInputBox();
    console.log(questionID);
    createQuestion(num, type, subject, questionID);
}

function createQuestion(target, type, subject, questionID) {
    var nextAct = document.getElementById("nextqtBnt");
    var backAct = document.getElementById("goBackBnt");
    var cnt = 0;
    var nwqt = [], inputItem = {}, correctAns;
    nextAct.addEventListener('click', function () {
        var ans1 = document.getElementById("ans1").value;
        var ans2 = document.getElementById("ans2").value;
        var ans3 = document.getElementById("ans3").value;
        var ans4 = document.getElementById("ans4").value;
        // Make sure all items have been inputed before going to next question
        if (ans1 !== "" && ans2 !== "" && ans3 !== "" && ans4 !== "" && qtDes !== "") {
            // write values to object "inputItem"
            inputItem = {
                id: subject.toString().toUpperCase() + cnt.toString(),
                a1: ans1,
                a2: ans2,
                a3: ans3,
                a4: ans4
            };
            clearTextArea();
            // write the object to the array
            nwqt[cnt] = inputItem;
            ++cnt;
            if (cnt == target) {
                addQuestionToDatabase(nwqt, type, subject, questionID);
            }
            // Make "Back" button clickable
            document.getElementById("goBackBnt").disabled = false;
        }
        console.log(cnt);
    })
    backAct.addEventListener('click', function () {
        if (cnt > 0) {
            cnt--;
            document.getElementById("ans1").value = nwqt[cnt].a1;
            document.getElementById("ans2").value = nwqt[cnt].a2;
            document.getElementById("ans3").value = nwqt[cnt].a3;
            document.getElementById("ans4").value = nwqt[cnt].a4;
        } else if (cnt === 0) {
            // Make "Back" button non-clickable
            document.getElementById("goBackBnt").disabled = true;
        }
    })
}

// show the textarea for input question
function showQuestionInputBox() {
    var nextAct = document.getElementById("nextqtBnt");
    var f = document.getElementsByClassName("firstStage")
    for (var i = 0; i < f.length; i++) {
        f[i].style.display = 'none';
    }
    document.getElementById("qtDes").style.display = "block";
    document.getElementById("ans1").style.display = "block";
    document.getElementById("ans2").style.display = "block";
    document.getElementById("ans3").style.display = "block";
    document.getElementById("ans4").style.display = "block";
    document.getElementById("goBackBnt").style.display = "inline";
    nextAct.style.display = "inline";
}

// End of function showQuestionInputBox

// clear the textarea
function clearTextArea() {
    document.getElementById("qtDes").value = "";
    document.getElementById("ans1").value = "";
    document.getElementById("ans2").value = "";
    document.getElementById("ans4").value = "";
    document.getElementById("ans3").value = "";
}

// End of function clearTextArea
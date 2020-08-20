import {addQuestionToDatabase, genQuestionID, loadSubject} from "./renderer.js";
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

    let bntTask = document.getElementById("task");
    // Action after clicking the "Task" anchor
    bntTask.onclick = function () {
        // Direct to "task.html"
        document.location.href = 'task.html';
    }
    // End of Action after clicking the "Task" anchor

    let bntPractise = document.getElementById("practise");
    // Action after clicking the "Practise" anchor
    bntPractise.onclick = function () {
        // Direct to "task.html"
        document.location.href = 'practise.html';
    }
    // End of Action after clicking the "Practise" anchor

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
        loadSubject()
        showQuestionNumber();
        clearTextArea();
        let nextStep = document.getElementById("nextBnt");

        nextStep.addEventListener('click', function () {
            chooseType();
        })

    }

    if (fileName[0] === "practise.html") {
        loadSubject()
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
    }
}

// End of function: reform

// Check if all the items have been filled
function allFill(name, id, email, pwd, compwd) {
    var unFillPart = "";
    var cnt = 0;

    // Check if student name have been filled or not
    if (name === "" && cnt === 0) {
        unFillPart += "1. Student Name\n";
        cnt++;
    } else if (name === "") {
        unFillPart += ++cnt + ". Student Name\n";
    }

    // Check if student ID have been filled or not
    if (id === "" && cnt === 0) {
        unFillPart += "1. Student ID\n";
        cnt++;
    } else if (id === "") {
        unFillPart += ++cnt + ". Student ID\n";
    }

    // Check if student Emsil have been filled or not
    if (email === "" && cnt === 0) {
        unFillPart += "1. Student Email\n";
        cnt++;
    } else if (email === "") {
        unFillPart += ++cnt + ". Student Email\n";
    }

    // Check if password have been filled or not
    if (pwd === "" && cnt === 0) {
        unFillPart += "1. Password\n";
        cnt++;
    } else if (pwd === "") {
        unFillPart += ++cnt + ". Password\n";
    }

    // Check if confirm password have been filled or not
    if (compwd === "" && cnt === 0) {
        unFillPart += "1. Confirm Password\n";
        cnt++;
    } else if (compwd === "") {
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
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
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
    let stuID = email.substring(0, email.lastIndexOf("@"));
    registerApp.auth().createUserWithEmailAndPassword(email, pwd).then(function () {
        registerApp.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("Account created uid:" + user.uid);
                registerdb.ref('/users/' + stuID + '/').set({
                    email: email,
                    name: name,
                    password: pwd,
                    role: "student",
                    uid: user.uid,
                    id: id
                }).then(r =>
                    alert("Account of ID:" + id + " Name: " + name + " created successfully\n")
                );
            }
        })
    });
    registerApp.auth().signOut().then(r => console.log("new account sign outed"));
}


// Choose the type of quiz the teacher want to set
function chooseType() {
    const v = document.getElementById("qtType");
    const qtNum = document.getElementById("qtNumber");
    const qtSubject = document.getElementById("qtSubject");
    const qtlevel = document.getElementById("qtLevel");
    let num, type, subject, level;
    if (v.selectedIndex === 0) {
        num = qtNum.value;
        type = "task";
    } else {
        num = 1;
        type = "practise";
    }
    level = qtlevel.options[qtlevel.selectedIndex].text
    level = level.toString().replace(" ", "_");
    subject = qtSubject.options[qtSubject.selectedIndex].text;
    genQuestionID(type, subject, level);
    showQuestionInputBox();
    createQuestion(num, type, subject, level);
}

function createQuestion(target, type, subject, level) {
    let nextAct = document.getElementById("nextqtBnt");
    let backAct = document.getElementById("goBackBnt");
    let cnt = 0;
    var nwqt = [], inputItem = {}, correctAns = [];
    nextAct.addEventListener('click', function () {
        let ans1 = document.getElementById("ans1").value;
        let ans2 = document.getElementById("ans2").value;
        let ans3 = document.getElementById("ans3").value;
        let ans4 = document.getElementById("ans4").value;
        let qtDes = document.getElementById("qtDes").value;
        let ans1Radio = document.getElementById("ans1Radio");
        let ans2Radio = document.getElementById("ans2Radio");
        let ans3Radio = document.getElementById("ans3Radio");
        let ans4Radio = document.getElementById("ans4Radio");

        // Make sure all items have been inputed before going to next question
        if (ans1 !== "" && ans2 !== "" && ans3 !== "" && ans4 !== "" && qtDes !== "" && (ans1Radio.checked || ans2Radio.checked || ans3Radio.checked || ans4Radio.checked)) {
            let correctOption;
            if (ans1Radio.checked) {
                correctOption = "a" + ans1Radio.value.toString();
            } else if (ans2Radio.checked) {
                correctOption = "a" + ans2Radio.value.toString();
            } else if (ans3Radio.checked) {
                correctOption = "a" + ans3Radio.value.toString();
            } else {
                correctOption = "a" + ans4Radio.value.toString();
            }
            console.log(correctOption)
            // write values to object "inputItem"
            inputItem = {
                id: subject.toString().toUpperCase() + cnt.toString(),
                qt: qtDes,
                a1: ans1,
                a2: ans2,
                a3: ans3,
                a4: ans4,
                correct: correctOption
            };
            clearTextArea();
            // write the object to the array
            nwqt[cnt] = inputItem;
            correctAns[cnt] = correctOption
            ++cnt;
            if (cnt == target) {
                let questionID = document.getElementById("qtID").textContent
                addQuestionToDatabase(nwqt, correctAns, type, subject, level, questionID);
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
    document.getElementById("qtDes").style.display = "inline-block";
    document.getElementById("ans1").style.display = "inline-block";
    document.getElementById("ans2").style.display = "inline-block";
    document.getElementById("ans3").style.display = "inline-block";
    document.getElementById("ans4").style.display = "inline-block";
    document.getElementById("goBackBnt").style.display = "inline";
    document.getElementById("ans1Radio").style.display = "inline-block"
    document.getElementById("ans2Radio").style.display = "inline-block"
    document.getElementById("ans3Radio").style.display = "inline-block"
    document.getElementById("ans4Radio").style.display = "inline-block"
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
    document.getElementById("ans1Radio").checked = false;
    document.getElementById("ans2Radio").checked = false;
    document.getElementById("ans3Radio").checked = false;
    document.getElementById("ans4Radio").checked = false;
}

// End of function clearTextArea
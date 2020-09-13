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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Import Package "custom-electron-titlebar" To Create Customize Title Bar
/*const customTitlebar = require('custom-electron-titlebar');

// Initilize Customize Title Bar
let titleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#f1f1f1'),
    shadow: true,
    maximizable: false,
});

// Add Customize Title Bar To The Frame (Expected : No Title)
titleBar.updateTitle('');*/

// Initialize Firebase Database
let db = firebase.database();

// Get Current HTML Page Name
var fileName = location.pathname.split("/").slice(-1);
console.log(fileName[0]);

// Check if this page is the login in page
if (fileName[0] === "index.html") {
    var signIn = document.getElementById("signInbnt");
    var forgotPwd = document.getElementById("fgtpwd");

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // Show the Previous Sign in Account email
            document.getElementById("email").value = user.email;
        }
    });

    // Sign in 
    signIn.addEventListener('click', function () {
        let email = document.getElementById("email").value;
        let pwd = document.getElementById("pwd").value;
        let id = email.substring(0, email.lastIndexOf("@"));
        sessionStorage.setItem("userID", id);
        signInFunction(email, pwd);
    });
    // End of Sign in

    // Forgot Password
    forgotPwd.addEventListener('click', function () {
        var email = document.getElementById("email").value;

        // Check if the email field is empty
        if (email !== '') {
            firebase.auth().sendPasswordResetEmail(email).then(function () {
                window.alert("Email has been sent to you.")
            }).catch(function (error) {
                if (error != null) {
                    // Get Error Message
                    var errorMessage = error.message;

                    // Make The Horizontal Rule Be Visible
                    document.getElementById("login-hr").style.visibility = "visible";

                    // Load Error Message 
                    document.getElementById("login-error").innerHTML = errorMessage;

                    // Make The Error Message Be Visible
                    document.getElementById("login-error").style.visibility = "visible";

                }
            });
        }
    })
    // End of Forgot Password
} else if (fileName[0] === "system.html") {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            getUserName(sessionStorage.getItem("userID"));
            checkRole(sessionStorage.getItem("userID"))
        }
    });
}

if (fileName[0] !== "index.html") {
    var btnLogOut = document.getElementById("systemLogout");

    // Action after clicking the "Logout" anchor
    btnLogOut.onclick = function () {
        // Sign out
        firebase.auth().signOut().then(
            function () {
                // Direct back to Login page "index.html"
                document.location.href = 'index.html';
            }
        )
        // End of Sing out
    }
    // End of Action after clicking the "Logout" anchor
}

function signInFunction(email, pwd) {
    firebase.auth().signInWithEmailAndPassword(email, pwd).then(function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                db.ref('users/' + sessionStorage.getItem("userID") + '/name').once('value').then(
                    name => {
                        passwordUpdate(name.val(), pwd)
                    }
                )
            }
        });
        document.location.href = 'system.html';
    }).catch(function (error) {
        if (error != null) {
            // Get Error Message
            let errorMessage = error.message;

            // Make The Horizontal Rule Be Visible
            document.getElementById("login-hr").style.visibility = "visible";

            // Load Error Message
            document.getElementById("login-error").innerHTML = errorMessage;

            // Make The Error Message Be Visible
            document.getElementById("login-error").style.visibility = "visible";

        }
    })
}

function getUserName(uid) {
    db.ref('users/' + uid + '/name').once('value').then(
        name => {
            document.getElementById('welcomeMessage').style.visibility = "hidden";
            document.getElementById('welcomeMessage').innerHTML = "Welcome " + name.val();
            document.getElementById('welcomeMessage').style.visibility = "visible";
        }
    )
}

function checkRole(username) {
    console.log(username)
    db.ref('/users/' + username + '/role').once('value').then(
        role => {
            if (role.val() !== "teacher") {
                let teacherView = document.getElementsByClassName('teacherView');
                for (let i = 0; i < teacherView.length; i++) {
                    teacherView[i].style.display = 'none';
                }
            }
        }
    )
}

function passwordUpdate(username, currPassword) {
    var updates = {};
    db.ref('/users/' + username + '/password').once('value').then(
        pd => {
            if (pd.val === currPassword) {
                return;
            }
            updates['/users/' + username + '/password'] = currPassword
            firebase.database().ref().update(updates).then(() => {
                console.log("update success")
            });
        }
    )
}

// Load the subject name to "qtTopic"
export function loadSubject() {
    db.ref("/subject/").once("value").then(result => {
        let sub = result.val();
        for (const key of Object.keys(sub)) {
            const subjectName = sub[key];
            const opt = document.createElement("OPTION");
            opt.appendChild(document.createTextNode(subjectName));
            document.getElementById("qtSubject").appendChild(opt);
        }
    });
}

// add the questions to the firebase database
// export the function is because I call this function in "system.js" file
export function addQuestionToDatabase(inputedQuestions, correctAns, type, subject, level, questionID) {
    db.ref("/" + type + "/" + level + "/" + subject + "/" + questionID).set({
        question: inputedQuestions,
        answer: correctAns
    }).then(() => {
        document.location.href = 'newqt.html';
    });
}

//End of function addQuestionToDatabase

/*
generate a question for the question
if the question is for task, the ID will start with "T_" (i.e. T_ENGLISH_1)
else the ID will start with "P_" (i.e. P_MATH_1)
export the function is because I call this function in "system.js" file
*/
export function genQuestionID(type, subject, level) {
    let idType;
    if (type === "task") {
        idType = "T_";
    } else {
        idType = "P_";
    }
    db.ref("/" + type + "/" + level + "/" + subject).on('value', r => {
        document.getElementById("qtID").textContent = idType + subject.toString().toUpperCase() + "_" + (r.numChildren() + 1);
    })
}

// End of function genQuestionID
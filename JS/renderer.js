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
var db = firebase.database();

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
        var email = document.getElementById("email").value;
        var pwd = document.getElementById("pwd").value;

        firebase.auth().signInWithEmailAndPassword(email, pwd).then(function () {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    var userId = user.uid;
                    passwordUpdate(userId, pwd)
                }
            });
            document.location.href = 'system.html';
        }).catch(function (error) {
            if (error != null) {
                // Get Error Code
                var errorCode = error.code;

                // Get Error Message
                var errorMessage = error.message;

                // Make The Horizontal Rule Be Visible
                document.getElementById("login-hr").style.visibility = "visible";

                // Load Error Message 
                document.getElementById("login-error").innerHTML = errorMessage;

                // Make The Error Message Be Visible
                document.getElementById("login-error").style.visibility = "visible";
                return;
            }
        });
    })
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
                    // Get Error Code
                    var errorCode = error.code;

                    // Get Error Message
                    var errorMessage = error.message;

                    // Make The Horizontal Rule Be Visible
                    document.getElementById("login-hr").style.visibility = "visible";

                    // Load Error Message 
                    document.getElementById("login-error").innerHTML = errorMessage;

                    // Make The Error Message Be Visible
                    document.getElementById("login-error").style.visibility = "visible";
                    return;
                }
            });
        }
    })
    // End of Forgot Password
} else if (fileName[0] === "system.html") {
    firebase.auth().onAuthStateChanged(function (user) {
        if(user){
            var userId = user.uid;
            getUserName(userId);
            checkRole(userId);
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

function getUserName(userId){
    db.ref('/users/'+userId+'/name').once('value').then(
        name => {
            console.log(name.val());
            document.getElementById('welcomeMessage').style.visibility = "hidden";
            document.getElementById('welcomeMessage').innerHTML = "Welcome " + name.val();
            document.getElementById('welcomeMessage').style.visibility = "visible";
        }
    )
}

function checkRole(userId) {
    db.ref('/users/' + userId + '/role').once('value').then(
        role => {
            if (role.val() !== "teacher") {
                var teacherView = document.getElementsByClassName('teacherView');
                for (var i = 0; i < teacherView.length; i++) {
                    teacherView[i].style.display = 'none';
                }
            }
        }
    )
}

function passwordUpdate(userId, currPassword) {
    var updates = {};
    db.ref('/users/' + userId + '/password').once('value').then(
        pd => {
            if (pd.val !== currPassword) {
                updates['/users/' + userId + '/password'] = currPassword
            }
        }
    )
}
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCWdkpNfAFHAshIleSAHx_v9sqqX4lCjdI",
    authDomain: "learning-system-01.firebaseapp.com",
    databaseURL: "https://learning-system-01.firebaseio.com",
    projectId: "learning-system-01",
    storageBucket: "learning-system-01.appspot.com",
    messagingSenderId: "9597659671",
    appId: "1:9597659671:web:6483168c4d16fcad9e4a52",
    measurementId: "G-9724QZ8R0E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Import Package "custom-electron-titlebar" To Create Customize Title Bar
const customTitlebar = require('custom-electron-titlebar');

//Initilize Customize Title Bar
let titleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#f1f1f1'),
    shadow: true,
    maximizable: false,
});

// Add Customize Title Bar To The Frame (Expected : No Title)
titleBar.updateTitle('');

// Initialize Firebase Database
var db = firebase.database();

// Get Current HTML Page Name
var fileName = location.pathname.split("/").slice(-1);
console.log(fileName[0]);

// Check if this page is the login in page
if (fileName[0] === "index.html") {
    firebase.auth().signOut;
    var signIn = document.getElementById("signInbnt");
    var forgotPwd = document.getElementById("fgtpwd");

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // Show the Previous Sign in Account email
            document.getElementById("email").value = user.email;
        }
    });

    //Sign in 
    signIn.addEventListener('click', function () {
        var email = document.getElementById("email").value;
        var pwd = document.getElementById("pwd").value;

        firebase.auth().signInWithEmailAndPassword(email, pwd).then(function () {
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
    //End of Sign in

    //Forgot Password
    forgotPwd.addEventListener('click', function () {
        var email = document.getElementById("email").value;

        //Check if the email field is empty
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
    //End of Forgot Password
} else if (fileName[0] === "system.html") {
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
    firebase.auth().onAuthStateChanged(function (user) {
        if(user){
            var userId = user.uid;
            getUserName(userId);
        }
    });
}

function getUserName(userId){
    db.ref('/users/'+userId+'/name').once('value').then(
        name=>{
                document.getElementById('welcomeMessage').innerHTML = "Welcome " + name.val();
        }
    )
}

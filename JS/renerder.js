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

// Initialize Firebase Database
var db = firebase.database();

// Get Current HTML Page Name
var fileName = location.pathname.split("/").slice(-1);
console.log(fileName[0] === "index.html");

// Check if this page is the login in page
if (fileName[0] === "index.html") {
    firebase.auth().signOut;
    var signIn = document.getElementById("signInbnt");
    var forgotPwd = document.getElementById("fgtpwd");

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //Show the Previous Sign in Account email
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
                var errorCode = error.code;
                var errorMessage = error.message;
                document.getElementById("login-hr").style.visibility = "visible";
                document.getElementById("login-error").innerHTML = errorMessage;
                document.getElementById("login-error").style.visibility = "visible";
                return;
            }
        });
    })
    //End of Sign in

    //Forgot Password
    forgotPwd.addEventListener('click', function () {
        var email = document.getElementById("email").value;
        if (email !== '') {
            firebase.auth().sendPasswordResetEmail(email).then(function () {
                window.alert("Email has been sent to you.")
            }).catch(function (error) {
                if (error != null) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    document.getElementById("login-hr").style.visibility = "visible";
                    document.getElementById("login-error").iinnerHTML = errorMessage;
                    document.getElementById("login-error").style.visibility = "visible";
                    return;
                }
            });
        }
    })
    //End of Forgot Password
}

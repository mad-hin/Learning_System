var extented = false;
function collaspeSidebar() {
    if (!extented) {
        document.getElementById("mySidebar").style.width = "180px";
        this.extented = true;
    } else {
        document.getElementById("mySidebar").style.width = "50px";
        this.extented = false;
    }
}

// Get Current HTML Page Name
var fileName = location.pathname.split("/").slice(-1);
console.log(fileName[0]);

window.onload = function () {
    var bntHome = document.getElementById("home");
    // Action after clicking the "Home" anchor
    bntHome.onclick = function () {
        // Direct to "system.html"
        if (fileName[0] !== "system.html") {
            document.location.href = 'system.html';
        }
    }
    //End of Action after clicking the "New Account" anchor
    var bntNewStuAcc = document.getElementById("newStuAcc");
    // Action after clicking the "New Account" anchor
    bntNewStuAcc.onclick = function () {
        // Direct to "newstuacc.html"
        document.location.href = 'newstuacc.html';
    }
    // End of Action after clicking the "New Student Account" anchor

    if (fileName[0] === "newstuacc.html") {
        var reset = document.getElementById("redoBnt");
        var create = document.getElementById("signUpBnt");
        var stuName = document.getElementById("stuName").value;
        var stuId = document.getElementById("stuId").value;
        var stuEmail = document.getElementById("stuEmail").value;
        var stuPwd = document.getElementById("stuPwd").value;
        var stuComPwd = document.getElementById("stuComPwd").value;

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
    console.log(pwdCheck(stuPwd, stuComPwd));
    if (pwdCheck(stuPwd, stuComPwd)) {
        console.log(true);
    } else {
        console.log(false);
    }
}

function reform() {
    document.getElementById("signUp").reset();
}

function pwdCheck(pwd, compwd) {
    if (pwd === compwd) {
        return true;
    } else {
        return false;
    }
}
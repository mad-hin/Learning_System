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
    if (allFill(stuName, stuId, stuEmail, stuPwd, stuComPwd)) {
        if (pwdCheck(stuPwd, stuComPwd)) {
            console.log(true);
        } else {
            console.log(false);
        }
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

function allFill(name,id,email,pwd,compwd) {
    var unFillPart = "";
    var cnt = 0;
    if (name == "" && cnt === 0) {
        unFillPart += "1. Student Name";
        cnt++;
    } else if (name == "") {
        unFillPart += ", " + ++cnt + ". Student Name";
        
    }

    if (id == "" && cnt === 0) {
        unFillPart += "1. Student ID";
        cnt++;
    }
    else if (id == "") {
        unFillPart += ", " + ++cnt + ". Student ID";
    }

    if (email == "" && cnt === 0) {
        unFillPart += "1. Student Email";
        cnt++;
    } else if (email == "") {
        unFillPart += ", " + ++cnt + ". Student Email";
    }

    if (pwd == "" && cnt === 0) {
        unFillPart += "1. Password";
        cnt++;
    } else if (pwd == "") {
        unFillPart += ", " + ++cnt + ". Password";
    }

    if (compwd == "" && cnt === 0) {
        unFillPart += "1. Confirm Password";
        cnt++;
    } else if (compwd == "") {
        unFillPart += ", " + ++cnt + ". Confirm Password";
    }

    if (unFillPart !== "") {
        unFillMessage(unFillPart);
        return false;
    } else {
        return true;
    }
}

function unFillMessage(unFillPart) {
    console.log(unFillPart);
    alert("Error, Account cannot be created. The following item(s) have not been filled: " + unFillPart);
}
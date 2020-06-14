var extented = false;
function collaspeSidebar() {
    if (!extented) {
        document.getElementById("mySidebar").style.width = "175px";
        document.getElementById("main").style.marginLeft = "175px";
        this.extented = true;
    } else {
        document.getElementById("mySidebar").style.width = "50px";
        document.getElementById("main").style.marginLeft = "50px";
        this.extented = false;
    }
}

window.onload = function () {
    var bntHome = document.getElementById("home");
    // Action after clicking the "Home" anchor
    bntHome.onclick = function () {
        // Direct to "system.html"
        document.location.href = 'system.html';
    }
    //End of Action after clicking the "New Account" anchor
    var bntNewStuAcc = document.getElementById("newStuAcc");
    // Action after clicking the "New Account" anchor
    bntNewStuAcc.onclick = function () {
        // Direct to "newstuacc.html"
        document.location.href = 'newstuacc.html';
    }
    // End of Action after clicking the "New Student Account" anchor
}
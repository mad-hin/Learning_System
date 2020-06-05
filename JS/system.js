var extented = false;
function collaspeSidebar() {
    if (!extented) {
        document.getElementById("mySidebar").style.width = "160px";
        document.getElementById("main").style.marginLeft = "160px";
        this.extented = true;
    } else {
        document.getElementById("mySidebar").style.width = "60px";
        document.getElementById("main").style.marginLeft = "60px";
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
// End of Action after clicking the "Home" anchor
}
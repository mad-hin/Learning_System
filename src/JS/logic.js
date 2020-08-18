// Check the Sidebar extended or not (default: false)
var extended = false;

// Function to make the sidebar extent (pop out)
function collapseSidebar() {
    if (!extended) {
        // Change the sidebar width and extent to 200px
        document.getElementById("mySidebar").style.width = "200px";
        this.extended = true;
    } else {
        // Change the sidebar width and close to 50px
        document.getElementById("mySidebar").style.width = "50px";
        this.extended = false;
    }
}

// End of Function: collapseSidebar()

// show the number of questions that the teacher want to make
function showQusetionNumber() {
    var v = document.getElementById("qtType");
    console.log(v.selectedIndex);
    if (v.selectedIndex === 0) {
        document.getElementById("qtNumber").style.display = "block";
    } else {
        document.getElementById("qtNumber").style.display = "none";
    }
}
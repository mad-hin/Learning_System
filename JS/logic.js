// Check the Sidebar extended or not (default: false)
var extended = false;

// Function to make the sidebar extent (pop out)
function collapseSidebar() {
    if (!extended) {
        // Change the sidebar width and extent to 200px
        document.getElementById("mySidebar").style.width = "200px";
        this.extented = true;
    } else {
        // Change the sidebar width and close to 50px
        document.getElementById("mySidebar").style.width = "50px";
        this.extented = false;
    }
}

// End of Function: collapseSidebar()
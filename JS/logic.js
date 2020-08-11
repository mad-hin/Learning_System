// Check the Sidebar extented or not (default: false)
var extented = false;

// Function to make the sidebar extent (pop out)
function collaspeSidebar() {
    if (!extented) {
        // Change the sidebar width and extent to 200px
        document.getElementById("mySidebar").style.width = "200px";
        this.extented = true;
    } else {
        // Change the sidebar width and close to 50px
        document.getElementById("mySidebar").style.width = "50px";
        this.extented = false;
    }
}
// End of Function: collaspeSidebar()
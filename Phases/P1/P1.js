// setup function
function setup() {
  // toggle enable offcanvas menu
  var keyboardMenu = new bootstrap.Offcanvas(document.getElementById("keyboardMenu"));

  $("#edit1").on("change", function () {
    keyboardMenu.toggle();
  });
}


// JavaScript for Keyboard

function addChar(selection) {
    // Get the value from the id'ed field
    var currChars = $("#words").val();
  
    if (selection === "bksp") {
      // Set the id'ed field to a shortened string
      $("#words").val(currChars.substring(0, currChars.length - 1));
    } else {
      // Set the id'ed field to the longer string
      $("#words").val(currChars.concat(selection));
    }
  }
  
  function enter() {
    var content = $("#words").val();
    console.log(content);
    $("#words").val("");
  }

  function toUpperCase() {
    caps = "true";
    let str = "CAPS ON"
    document.getElementById("header").innerHTML = str.fontcolor("red");
  }
// end of keyboard JavaScript
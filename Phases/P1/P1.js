// setup function
function setup() {
  // toggle enable offcanvas menu
  let keyboardMenu = document.getElementById('keyboardMenu');
  let keyboardMenuBS = new bootstrap.Offcanvas(keyboardMenu);

  $("#edit1").on("change", function () {
    keyboardMenuBS.toggle();
    console.log(document.getElementById('edit1').checked);
  });

  // switches toggle when keyboardMenu is closed
  keyboardMenu.addEventListener('hide.bs.offcanvas', function () {
    //document.getElementById('edit1').checked = false;
    $("#edit1").prop('checked', false); //uncheck
    console.log($("#edit1").change);
})
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
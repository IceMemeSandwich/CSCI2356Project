var activeBox = 0;

function setup() {
  let keyboardMenu = document.getElementById('keyboardMenu');
  let keyboardMenuBS = new bootstrap.Offcanvas(keyboardMenu);
  // every switch
  let toggles = document.querySelectorAll(".switch input");

  // toggle enables offcanvas menu
  // edit switch 1
  $("#edit1").on("change", function () {
    keyboardMenuBS.toggle();
    activeBox = 1;
  });

  // edit switch 2
  $("#edit2").on("change", function () {
    keyboardMenuBS.toggle();
    activeBox = 2;
  });

  // edit switch 3
  $("#edit3").on("change", function () {
    keyboardMenuBS.toggle();
    activeBox = 3;
  });

  // switches ALL toggles when keyboardMenu is closed
  // For now, I dont see a reason for any to be "on" when menu closed - D
  keyboardMenu.addEventListener('hide.bs.offcanvas', function () {
    for (let i of toggles) {
      i.checked = false;
    }
    console.log(activeBox);
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
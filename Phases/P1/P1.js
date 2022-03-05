

var activeBox = 0;
var capsPressed = false;

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
    var retrievedBoxObject = JSON.parse(window.localStorage.getItem('box1'));
    console.log(retrievedBoxObject);
    document.getElementById("textInputBox").value = retrievedBoxObject;
  });

  // edit switch 2
  $("#edit2").on("change", function () {
    keyboardMenuBS.toggle();
    activeBox = 2;
    var retrievedBoxObject = JSON.parse(window.localStorage.getItem('box2'));
    console.log(retrievedBoxObject)
    document.getElementById("textInputBox").value = retrievedBoxObject;
  });

  // edit switch 3
  $("#edit3").on("change", function () {
    keyboardMenuBS.toggle();
    activeBox = 3;
    var retrievedBoxObject = JSON.parse(window.localStorage.getItem('box3'));
    console.log(retrievedBoxObject);
    document.getElementById("textInputBox").value = retrievedBoxObject;
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
  var currChars = $("#textInputBox").val();
  var selectionCaps = selection.toUpperCase(); 
  
  if (selection === "bksp") {
    // Set the id'ed field to a shortened string
    $("#textInputBox").val(currChars.substring(0, currChars.length - 1));
  } else if (capsPressed == true) {
    // Set the id'ed field to the (capitalized) longer string
    $("#textInputBox").val(currChars.concat(selectionCaps));
    toCaps(false);
  } else {
    // Set the id'ed field to the longer string
    $("#textInputBox").val(currChars.concat(selection));
  }
}
  
function enter() {
  var content = $("#textInputBox").val();
  content = $("#textInputBox").val(content.concat("\n"));
}

// Devin
function toCaps(capsOn) {
  console.log(capsOn);
  switch (capsOn) {
    case false:
      // Make the output not caps
      capsPressed = false;
      break
    case true:
      // Make the output caps
      console.log("Caps On");
      capsPressed = true;
      break
  }
}


// end of keyboard JavaScript

/**
 * Function to save the values of the text boxes into individual objects stored in local storage
 * written by Connor MacNeil
 */
function saveTextBox() {
  if (activeBox == 1) {
    console.log($("#textInputBox").val());
    window.localStorage.setItem('box1', JSON.stringify($("#textInputBox").val()));
  } else if (activeBox == 2) {
    console.log($("textInputBox").val());
    window.localStorage.setItem('box2', JSON.stringify($("#textInputBox").val()));
  } else if (activeBox == 3) {
    console.log($("textInputBox").val());
    window.localStorage.setItem('box3', JSON.stringify($("#textInputBox").val()));
  }
  
}
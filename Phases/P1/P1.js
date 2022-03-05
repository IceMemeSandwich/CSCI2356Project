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

// JavaScript for Keyboard



// Devin
function toCaps(capsOn) {
  let n = Object.keys(KEYS);
  switch (capsOn) {
    case false:
      // Make the output not caps
      capsPressed = false;
      for (let i of n) {
        document.getElementById(i).text = KEYS[i][0];
      }
      break
    case true:
      // Make the output caps
      capsPressed = true;
      for (let i of n) {
        document.getElementById(i).text = KEYS[i][1];
      }
      break
  }
}

// Writing anything after this function will not work (for what reason i have no clue)
// don't use switch statements kids, because they suck

function addChar(selection) {
  // Get the value from the id'ed field
  let currChars = $("#textInputBox").val();

  switch (selection) {
    case "bksp":
      // Set the id'ed field to a shortened string
      // Connor M.
      $("#textInputBox").val(currChars.substring(0, currChars.length - 1));
      break;
    case "enter":
      // Connor M.
      currChars = $("#textInputBox").val(currChars.concat("\n"));
      break;
    default:
      switch (capsPressed) {
        case true:
          $("#textInputBox").val(currChars.concat(KEYS[selection][1]));
          toCaps(false);
          break;
        case false:
          $("#textInputBox").val(currChars.concat(KEYS[selection][0]));
          break;
      }
  } 



}

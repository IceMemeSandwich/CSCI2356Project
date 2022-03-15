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
    document.getElementById("editarea").style.display = "block";
    activeBox = 1;
    var retrievedBoxObject = JSON.parse(window.localStorage.getItem('box1'));
    document.getElementById("textInputBox").value = retrievedBoxObject;

    // make other edit toggles hidden when select edit1 - Chris and Matt
    document.getElementById("edit2").style.visibility = "hidden";
    document.getElementById("edit3").style.visibility = "hidden";
  });

  // edit switch 2
  $("#edit2").on("change", function () {
    document.getElementById("editarea").style.display = "block";
    activeBox = 2;
    var retrievedBoxObject = JSON.parse(window.localStorage.getItem('box2'));
    document.getElementById("textInputBox").value = retrievedBoxObject;

    // make other edit toggles hidden when select edit2 - Chris and Matt
    document.getElementById("edit1").style.visibility = "hidden";
    document.getElementById("edit3").style.visibility = "hidden";
  });

  // edit switch 3
  $("#edit3").on("change", function () {
    document.getElementById("editarea").style.display = "block";
    activeBox = 3;
    var retrievedBoxObject = JSON.parse(window.localStorage.getItem('box3'));
    document.getElementById("textInputBox").value = retrievedBoxObject;

    // make other edit toggles hidden when select edit3 - Chris and Matt
    document.getElementById("edit1").style.visibility = "hidden";
    document.getElementById("edit2").style.visibility = "hidden";
  });

  // switches ALL toggles when keyboardMenu is closed
  // For now, I dont see a reason for any to be "on" when menu closed - D
  keyboardMenu.addEventListener('hide.bs.offcanvas', function () {
    for (let i of toggles) {
      i.checked = false;
    }
    saveTextBox();
    
    // make all toggles visible when closing menu - Chris and Matt
    document.getElementById("edit1").style.visibility = "visible";
    document.getElementById("edit2").style.visibility = "visible";
    document.getElementById("edit3").style.visibility = "visible";
  });

  
}


/**
 * Function to save the values of the text boxes into individual objects stored in local storage
 * written by Connor MacNeil
 */
 function saveTextBox() {
  if (activeBox == 1) {
    window.localStorage.setItem('box1', JSON.stringify($("#textInputBox").val()));
  } else if (activeBox == 2) {
    window.localStorage.setItem('box2', JSON.stringify($("#textInputBox").val()));
  } else if (activeBox == 3) {
    window.localStorage.setItem('box3', JSON.stringify($("#textInputBox").val()));
  }
  
}

function clearLocalCopy() {
  var clearI = confirm("Do you want to delete your work?");
  switch (clearI){
    case false:
      break;
    default:
      $("#textInputBox").val("");
      saveTextBox();
  }
}

// JavaScript for Keyboard



// Devin
function toCaps() {
  let n = Object.keys(KEYS);
  switch (capsPressed) {
    case true:
      // Make the output not caps
      capsPressed = false;
      for (let i of n) {
        document.getElementById(i).text = KEYS[i][0];
      }
      break
    case false:
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
    case "space":
      currChars = $("#textInputBox").val(currChars.concat(" "));
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

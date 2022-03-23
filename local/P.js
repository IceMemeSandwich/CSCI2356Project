
var activeBox = 0;
var capsPressed = false;

function setup() {
  let toggles = document.querySelectorAll(".switch input");
  let editArea = document.getElementById("editArea");

  // edit switch 1
  $("#edit1").on("change", function (event) {
    switch (event.target.checked) {
      case false:
        closeEdit();
        break;
      case true:
        editArea.style.display = 'table-cell';
        activeBox = 1;
        var retrievedBoxObject = JSON.parse(window.localStorage.getItem('box1'));
        document.getElementById("textInputBox").value = retrievedBoxObject;
        // Make other toggles disabled when edit1 is selected - Devin
        for (let i of toggles) {
          switch (i.checked) {
            case (false):
              i.disabled = true;
          }
          }
          break;
    }
  });

  // edit switch 2
  $("#edit2").on("change", function (event) {
    switch (event.target.checked) {
      case false:
        closeEdit();
        break;
      case true:
        editArea.style.display = 'table-cell';
        activeBox = 2;
        var retrievedBoxObject = JSON.parse(window.localStorage.getItem('box2'));
        document.getElementById("textInputBox").value = retrievedBoxObject;
        // Make other toggles disabled when edit2 is selected - Devin
        for (let i of toggles) {
          switch (i.checked) {
            case (false):
              i.disabled = true;
          }
          }
          break;
    }
  });

  // edit switch 3
  $("#edit3").on("change", function (event) {
    switch (event.target.checked) {
      case false:
        var keyboardMenu = document.getElementById('keyboardMenu');
        var keyboardMenuBS = new bootstrap.Offcanvas(keyboardMenu);
        keyboardMenuBS.hide();
        closeEdit();
        break;
      case true:
        editArea.style.display = 'table-cell';
        activeBox = 3;
        var retrievedBoxObject = JSON.parse(window.localStorage.getItem('box3'));
        document.getElementById("textInputBox").value = retrievedBoxObject;
        // Make other toggles disabled when edit3 is selected - Devin
        for (let i of toggles) {
          switch (i.checked) {
            case (false):
              i.disabled = true;
          }
          }
          break;
    }
  });
}


function closeEdit() {
  document.getElementById("editArea").style.display = "none";
  var keyboardMenu = document.getElementById('keyboardMenu');
  var keyboardMenuBS = new bootstrap.Offcanvas(keyboardMenu);
  keyboardMenu.setAttribute("style", "background-color: rgb(92, 92, 92); visibility: hidden;")
  keyboardMenuBS.hide();
  // every switch
  var toggles = document.querySelectorAll(".switch input");
  for (let i of toggles) {
    i.checked = false;
    i.disabled = false;
  }
  saveTextBox();
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
      closeEdit();
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

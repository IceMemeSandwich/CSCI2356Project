// CHANGE LATER
const SERVER_URL = "http://ugdev.cs.smu.ca:3111";

var activeBox = 0;
var capsPressed = false;

function setup() {

  $.get(SERVER_URL + "/receive", receive).fail(errorCallback1);

  let toggles = document.querySelectorAll(".switch input");
  let editArea = document.getElementById("editArea");

  // edit switch 1
  $("#edit1").on("change", function (event) {
    switch (event.target.checked) {
      case false:
        closeEdit();
        event.target.checked = false;
        break;
      case true:
        setupBox(1);
        event.target.disabled = false;
        break;
    }
  });

  // edit switch 2
  $("#edit2").on("change", function (event) {
    switch (event.target.checked) {
      case false:
        closeEdit();
        event.target.checked = false;
        break;
      case true:
        setupBox(2);
        event.target.disabled = false;
        break;
    }
  });

  // edit switch 3
  $("#edit3").on("change", function (event) {
    switch (event.target.checked) {
      case false:
        closeEdit();
        event.target.checked = false;
        break;
      case true:
        setupBox(3);
        event.target.disabled = false;
        break;
    }
  });

// edit switches

}

// Cleaning time
function setupBox(box) {
  let toggles = document.querySelectorAll(".switch input");
  let editArea = document.getElementById("editArea");

  editArea.style.display = 'table-cell';
  activeBox = box;
  var retrievedBoxObject = JSON.parse(window.localStorage.getItem('box' + box.toString()));
  document.getElementById("textInputBox").value = retrievedBoxObject;
  // Make other toggles disabled when edit1 is selected - Devin
  for (let i of toggles) {
        i.disabled = true;
        console.log(i);
    }
    // Quick fix
}

function closeEdit() {
  document.getElementById("editArea").style.display = "none";
  var keyboardMenu = document.getElementById('keyboardMenu');
  var keyboardMenuBS = new bootstrap.Offcanvas(keyboardMenu);
  $('#keyboardMenu').toggleClass('show');
  keyboardMenuBS.hide();
  // every switch
  var toggles = document.querySelectorAll(".switch input");
  for (let i of toggles) {
    i.disabled = false;
  }
  saveTextBox();
  // closes the toggle by clicking it (i have no better ideas that work)
  $("#edit" + activeBox.toString()).trigger("click"); // turn it on
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

// talking to server functions - Devin R.

function send(id, name, post) {
  // Sends the text of a textbox and its number as a JSON to the server for saving
  let text = {
    "id": id,
    "name": name,
    "post": post
  };
  $.post(SERVER_URL + "/send", text, callback1).fail(errorCallback1);
  console.log(text);
}

function receive(posts) {
  // all we need is three post for now, but sometime later write someway to get a total amount
  for (let i in posts) {
    console.log(i);
    if (posts[i]["posted"] == true) {
      console.log(posts[i]["post"]);
      // check box
    };
    }

}

function callback1(returnedData) {
  console.log(returnedData);
}

function errorCallback1(err) {
console.log(err.responseText);
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

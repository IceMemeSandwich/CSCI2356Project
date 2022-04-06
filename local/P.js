/**
* @author Devin Robar
* @author Connor Macneil
* @author Chris Churchill
* @author Matt Audas
*/
const SERVER_URL = "http://ugdev.cs.smu.ca:3111";

var activeBox = 0;
var capsPressed = false;
var capsLockOn = false;
var count = 0;
var onlinePosts = {};
var wordBankCount = 0;

function setup() {

  $.get(SERVER_URL + "/receive", receive).fail(errorCallback1);

  // @ts-ignore
  let toggles = document.querySelectorAll(".switch input");
  // @ts-ignore
  let editArea = document.getElementById("editArea");

  // edit switch 1
  $("#edit1").on("change", function (event) {
    // @ts-ignore
    switch (event.target.checked) {
      case false:
        closeEdit();
        // @ts-ignore
        event.target.checked = false;
        break;
      case true:
        setupBox(1);
        // @ts-ignore
        event.target.disabled = false;
        break;
    }
  });

  // edit switch 2
  $("#edit2").on("change", function (event) {
    // @ts-ignore
    switch (event.target.checked) {
      case false:
        closeEdit();
        // @ts-ignore
        event.target.checked = false;
        break;
      case true:
        setupBox(2);
        // @ts-ignore
        event.target.disabled = false;
        break;
    }
  });

  // edit switch 3
  $("#edit3").on("change", function (event) {
    // @ts-ignore
    switch (event.target.checked) {
      case false:
        closeEdit();
        // @ts-ignore
        event.target.checked = false;
        break;
      case true:
        setupBox(3);
        // @ts-ignore
        event.target.disabled = false;
        break;
    }
  });

 // publish switches
// Connor M. and Devin R.

  $("#publish1").on("change", function (event) {
    // @ts-ignore
    switch (event.target.checked) {
      case false:
        errorBox("Are you sure that you want to unpublish #1?",publish,1);
        break;
      case true:
        errorBox("Are you sure that you want to publish #1?",publish,1);
        break;
    }
  });

  $("#publish2").on("change", function (event) {
    // @ts-ignore
    switch (event.target.checked) {
      case false:
        errorBox("Are you sure that you want to unpublish #2?",publish,2);
        break;
      case true:
        errorBox("Are you sure that you want to publish #2?",publish,2);
        break;
    }
  });

  $("#publish3").on("change", function (event) {
    // @ts-ignore
    switch (event.target.checked) {
      case false:
        errorBox("Are you sure that you want to unpublish #3?",publish,3);
        break;
      case true:
        errorBox("Are you sure that you want to publish #3?",publish,3);
        break;
    }
  });


  // other stuff

  $("#capsLockBtn").on("click", function (event) {
    switch (capsLockOn) {
      case false:
        capsLockOn = true;
        toCaps();
        document.getElementById("capsLockBtn").innerHTML = '<i class="bi bi-capslock-fill"></i>';
        break;
      case true:
        capsLockOn = false;
        toCaps();
        document.getElementById("capsLockBtn").innerHTML = '<i class="bi bi-capslock"></i>';
        break;
    }
  });
}

// Cleaning time
function setupBox(box) {

  let toggles = document.querySelectorAll(".switch input");
  let editArea = document.getElementById("editArea");

  editArea.style.display = 'table-cell';
  activeBox = box;
  var retrievedBoxObject = JSON.parse(window.localStorage.getItem('box' + box.toString()));
  // @ts-ignore
  document.getElementById("textInputBox").value = retrievedBoxObject;
  // Make other toggles disabled when edit1 is selected - Devin
  for (let i of toggles) {
        // @ts-ignore
        i.disabled = true;
    }
  // if post is posted, disable textbox and put the contents of whats online
  if (onlinePosts[box.toString()]["posted"] == true) {
    // @ts-ignore
    document.getElementById("textInputBox").value = onlinePosts[box.toString()]["post"];
    // @ts-ignore
    document.getElementById("textInputBox").disabled = true;
  }
}
/**
 * publishes post to server
 * @param  {number} box
 */
function publish(box) {
  let post = {
    "id": box.toString(),
    "title": box.toString(), // temp
    "post": JSON.parse(window.localStorage.getItem('box' + box.toString())),
  };
  $.post(SERVER_URL + "/send", post, callback1).fail(errorCallback1);
  // update local copy of whats online (bad temp solution (do better)) - Devin
  onlinePosts[box.toString()]["posted"] = publish;
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

function closeEdit() {
  document.getElementById("editArea").style.display = "none";
  // Closes the offcanvas menu after editArea is closed - Devin
  var keyboardMenu = document.getElementById('keyboardMenu');
  // @ts-ignore
  var keyboardMenuBS = bootstrap.Offcanvas.getInstance(keyboardMenu);
  // Fix if keyboardMenuBS is null because next command errors out if so
  if (keyboardMenuBS != null) {
    keyboardMenuBS.hide();
  }
  // reenables all the toggles - Devin
  var toggles = document.querySelectorAll(".switch input");
  for (let i of toggles) {
    // @ts-ignore
    i.disabled = false;
  }
  // in case the text box was disabled
  // @ts-ignore
  document.getElementById("textInputBox").disabled = false;
  // written by Connor MacNeil, Devin Robar
  window.localStorage.setItem('box' + activeBox.toString(), JSON.stringify($("#textInputBox").val()));
  // closes the toggle by clicking it (doing it the other way does not work for some reason)
  $("#edit" + activeBox.toString()).trigger("click");
}

function clearLocalCopy() {
  $("#textInputBox").val("");
  // written by Connor MacNeil, Devin Robar
  window.localStorage.setItem('box' + activeBox.toString(), JSON.stringify($("#textInputBox").val()));
  closeEdit();
}

function receive(posts) {
  // all we need is three post for now, but sometime later write someway to get a total amount
  onlinePosts = posts;
  for (let i in posts) {
    if (posts[i]["posted"] == true) {
      $("#publish" + i).attr("checked", true);
    }
    }

}

function callback1(returnedData) {
  console.log(returnedData);
}

function errorCallback1(err) {
console.log(err.responseText);
}



/**
 * Provides a yes/no popup with another conformation popup afterwards
 * Devin Robar
 *  * functions passed here must have 1 or 0 parameters
 * @param  {string} message message for textbox
 * @param  {function} func
 * @param  {function} param
 */
function errorBox(message, func, param = null) {
  document.getElementById('errorBox-body').innerHTML = message;
  // @ts-ignore
  $('#errorBox').modal("show");
  $('.modal-backdrop').removeClass("modal-backdrop"); 
  $("#errorBoxYesBtn").on("click", function () {
    $('#errorBox').modal("hide");
    $('#areYouSureBox').modal("show");
    // Removes backdrop
    $('.modal-backdrop').removeClass("modal-backdrop"); 
    $("#areYouSureBoxYesBtn").on("click", function () {
      // @ts-ignore
      $('#areYouSureBox').modal('hide');
      if (param == null) {
        func();
      } else {
        func(param);
      }
    });
    $("#areYouSureBoxNoBtn").on("click", function () {
      // @ts-ignore
      $('#areYouSureBox').modal('hide');
      console.log("1");
      return false;
    });
  });
  $("#errorBoxNoBtn").on("click", function () {
    // @ts-ignore
    $('#errorBox').modal('hide');
    console.log("1");
    return false;
  });
}

// JavaScript for Keyboard

// Devin
function toCaps() {
  // @ts-ignore
  let n = Object.keys(KEYS);
  switch (capsPressed) {
    case true:
      if (capsLockOn != true) {
        // Make the output not caps
        capsPressed = false;
        for (let i of n) {
          document.getElementById(i).text = KEYS[i][0];
        }
        // change icon for shift key
        document.getElementById("capsBtn").innerHTML = '<i class="bi bi-shift"></i>';
      }
      break;
    case false:
      // Make the output caps
      capsPressed = true;
      for (let i of n) {
        // @ts-ignore
        document.getElementById(i).text = KEYS[i][1];
      }
      // change icon for shift key
      document.getElementById("capsBtn").innerHTML = '<i class="bi bi-shift-fill"></i>';
      break;
  }
}

/**
 * Function to store the word bank entries
 * Connor M.
 */
function wordStore() {
  let wordEntered = $("#wordBankEntry").val();
  let newWordButton = document.createElement("button");
  let myDiv = document.getElementById("wordBankStorage");
  let removeButton = document.createElement("button");
  wordBankCount++;
  let wordId = "word" + wordBankCount;
  let removeWordId = "removeWord" + wordBankCount;
  newWordButton.innerHTML = wordEntered;
  removeButton.innerHTML = '<i class="bi bi-x-circle-fill"></i>';
  newWordButton.type = "button";
  removeButton.type = "button";
  newWordButton.id = wordId;
  removeButton.id = removeWordId;
  newWordButton.classList.add("btn");
  newWordButton.classList.add("btn-primary");
  removeButton.classList.add("btn");
  removeButton.classList.add("btn-primary");
  newWordButton.onclick = function() {
    let currChars = $("#textInputBox").val();
    $("#textInputBox").val(currChars.concat(wordEntered));
  }
  removeButton.onclick = function() {
    let confirmationCheck = confirm("Are you sure you want to remove this word?");
    if (confirmationCheck == true) {
      let confirmationCheck2 = confirm("Are you positive?");
      if (confirmationCheck2 == true) {
        document.getElementById(wordId).remove();
        document.getElementById(removeWordId).remove();
      }
    }
  }
  myDiv.appendChild(newWordButton);
  myDiv.appendChild(removeButton);
}

// Writing anything after this function will not work (for what reason i have no clue)
// don't use switch statements kids, because they suck

function addChar(selection) {
  // Get the value from the id'ed field
  let currChars = $("#textInputBox").val();
  let wordBankChars = $("#wordBankEntry").val();

  switch (selection) {
    // chris and matt
    case "undo":
      let lastIndex = currChars.trimEnd().lastIndexOf(" ");
      $("#textInputBox").val(currChars.substring(0, lastIndex + 1));
      let lastWordBankIndex = wordBankChars.trimEnd().lastIndexOf(" ");
      $("#wordBankEntry").val(wordBankChars.substring(0, lastWordBankIndex + 1));
      break;
    case "bksp":
      // Set the id'ed field to a shortened string
      // Connor M.
      // @ts-ignore
      $("#textInputBox").val(currChars.substring(0, currChars.length - 1));
      $("#wordBankEntry").val(wordBankChars.substring(0, currChars.length - 1));
      break;
    case "enter":
      // Connor M.
      // @ts-ignore
      currChars = $("#textInputBox").val(currChars.concat("\n"));
      break;
    case "space":
      // @ts-ignore
      currChars = $("#textInputBox").val(currChars.concat(" "));
      wordBankChars = $("#wordBankEntry").val(wordBankChars.concat(" "));
      break;
    default:
      switch (capsPressed) {
        case true:
          // @ts-ignore
          $("#textInputBox").val(currChars.concat(KEYS[selection][1]));
          $("#wordBankEntry").val(currChars.concat(KEYS[selection][1]));
          // @ts-ignore
          toCaps(false);
          // C-08 - Devin R.
          if ($("#textInputBox").val().slice(-1) == '!') {
            $("#textInputBox").val(currChars.concat("! "));
          }
          break;
        case false:
          // @ts-ignore
          $("#textInputBox").val(currChars.concat(KEYS[selection][0]));
          $("#wordBankEntry").val(wordBankChars.concat(KEYS[selection][0]));
          // C-08 - Devin R.
          if ($("#textInputBox").val().slice(-1) == '.') {
            $("#textInputBox").val(currChars.concat(". "));
          } else if ($("#textInputBox").val().slice(-1) == ',') {
            $("#textInputBox").val(currChars.concat(", "));
          } else if ($("#textInputBox").val().slice(-1) == '?') {
            $("#textInputBox").val(currChars.concat("? "));
          }
          if ($("#wordBankEntry").val().slice(-1) == '.') {
            document.getElementById("wordBankEntry").value = "";
          } else if ($("#wordBankEntry").val().slice(-1) == ',') {
            document.getElementById("wordBankEntry").value = "";
          } else if ($("#wordBankEntry").val().slice(-1) == '!') {
            document.getElementById("wordBankEntry").value = "";
          } else if ($("#wordBankEntry").val().slice(-1) == '?') {
            document.getElementById("wordBankEntry").value = "";
          }
          break;
      }
  } 
}

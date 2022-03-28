// CHANGE LATER
const SERVER_URL = "http://ugdev.cs.smu.ca:3111";

var activeBox = 0;
var capsPressed = false;

var onlinePosts = {};

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

  $("#publish1").on("change", function (event) {
    // @ts-ignore
    errorBox("Are you sure that you want to publish #1?",publish,1);
  });

  $("#publish2").on("change", function (event) {
    // @ts-ignore
    errorBox("Are you sure that you want to publish #2?",publish,2);
  });

  $("#publish3").on("change", function (event) {
    // @ts-ignore
    errorBox("Are you sure that you want to publish #1?",publish,3);
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

function closeEdit() {
  document.getElementById("editArea").style.display = "none";
  var keyboardMenu = document.getElementById('keyboardMenu');
  // @ts-ignore
  var keyboardMenuBS = new bootstrap.Offcanvas(keyboardMenu);
  $('#keyboardMenu').toggleClass('show');
  keyboardMenuBS.hide();
  // every switch
  var toggles = document.querySelectorAll(".switch input");
  for (let i of toggles) {
    // @ts-ignore
    i.disabled = false;
  }
  // in case the text box was disabled
  // @ts-ignore
  document.getElementById("textInputBox").disabled = false;
  saveTextBox();
  // closes the toggle by clicking it (i have no better ideas that work)
  $("#edit" + activeBox.toString()).trigger("click");
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
  $("#textInputBox").val("");
  saveTextBox();
  closeEdit();
}

function receive(posts) {
  // all we need is three post for now, but sometime later write someway to get a total amount
  console.log(posts);
  onlinePosts = posts;
  for (let i in posts) {
    if (posts[i]["posted"] == true) {
      // closes the toggle by clicking it (i have no better ideas that work)
      $("#publish" + i).prop("checked", true);
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
 * @returns {boolean} 
 */
function errorBox(message, func, param = null) {
  document.getElementById('errorBox-body').innerHTML = message;
  // @ts-ignore
  $('#errorBox').modal("show");
  $("#errorBoxYesBtn").on("click", function () {
    $('#errorBox').modal("hide");
    $('#areYouSureBox').modal("show");
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
      // Make the output not caps
      capsPressed = false;
      for (let i of n) {
        // @ts-ignore
        document.getElementById(i).text = KEYS[i][0];
      }
      break
    case false:
      // Make the output caps
      capsPressed = true;
      for (let i of n) {
        // @ts-ignore
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
      // @ts-ignore
      $("#textInputBox").val(currChars.substring(0, currChars.length - 1));
      break;
    case "enter":
      // Connor M.
      // @ts-ignore
      currChars = $("#textInputBox").val(currChars.concat("\n"));
      break;
    case "space":
      // @ts-ignore
      currChars = $("#textInputBox").val(currChars.concat(" "));
      break;
    default:
      switch (capsPressed) {
        case true:
          // @ts-ignore
          $("#textInputBox").val(currChars.concat(KEYS[selection][1]));
          // @ts-ignore
          toCaps(false);
          break;
        case false:
          // @ts-ignore
          $("#textInputBox").val(currChars.concat(KEYS[selection][0]));
          break;
      }
  } 
}

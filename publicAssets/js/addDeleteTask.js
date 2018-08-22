var info = {};
var txt = "";




window.addEventListener("load", function () { //working with event listeners and form data
  function sendData() {
    var XHR = new XMLHttpRequest();

    // Bind the FormData object and the form element
    var FD = new FormData(form);

    // Add html li on success response
    XHR.addEventListener("load", function(event) {
      var resBody = JSON.parse(event.target.responseText);
      var listEl = document.createElement("li");
      listEl.innerHTML = '<li>' + resBody.task + '<br>' + resBody.assignee + '</li>';
      document.getElementById("listArea").appendChild(listEl);
    });

    // Define what happens in case of error
    XHR.addEventListener("error", function(event) {
      alert('Make sure the form is completely filled in.');
    });

    // setup task to add
    XHR.open("POST", "http://localhost:3001/addTask");
    console.log(formInputs["task"].value);
    // The data sent is what the user provided in the form
    var thisthing = formInputs["task"].value;
    var thatthing = formInputs["assignee"].value
    XHR.send(JSON.stringify({'task': thisthing, 'assignee': thatthing}));
  }

  // grab form parts
  var form = document.getElementById("Theform");
  var formInputs = document.getElementById("Theform").elements;

  // make sure the listener runs not the default form submit behavior
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    sendData(); //send
  });
});



/*
function removeRow(input) {
    document.getElementById('theForm').removeChild(input.parentNode);
}
*/

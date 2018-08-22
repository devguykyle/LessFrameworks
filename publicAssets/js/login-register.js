function addLoginForm() { //Switch to login form

    var div = document.createElement('div');

    div.className = 'newForm';

    div.innerHTML =
        '<form action="/login" method="post">\
        Login\
        <input type="text" name="username" value="username" />\
        <input type="text" name="password" value="password" />\
        <input id="reqButton" type="submit" value="Login">\
        <input type="button" value="Register" onclick="addRegisterForm()" />\
        </form>';

    document.getElementById('theForm').innerHTML = "";
    document.getElementById('theForm').appendChild(div);

}


function addRegisterForm() { //Switch to register form

    var div = document.createElement('div');

    div.className = 'newForm';

    div.innerHTML =
        '<form action="/register" method="post">\
        Register\
        <input type="text" name="username" value="username" />\
        <input type="text" name="password" value="password" />\
        <input type="text" name="email" value="email" />\
        <input id="reqButton" type="submit" value="Register">\
        <input type="button" value="Login" onclick="addLoginForm()" />\
        </form>';

    document.getElementById('theForm').innerHTML = "";
    document.getElementById('theForm').appendChild(div);

}

function removeRow(input) { //old way to remove row
    document.getElementById('theForm').removeChild(input.parentNode);
}

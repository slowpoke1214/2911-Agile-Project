// If login-ed redirect
if (sessionStorage.getItem('jwt')) {
    window.location.replace('./index.html');
}

// Clone and Remove Template Object
let errorMessage = document.getElementById('errorMessage');
let messageBox = errorMessage.cloneNode(true);
errorMessage.remove();

// On form submit
$('#loginUser').submit(function(event) {
    // Post to url
    $.ajax({
        url:'http://127.0.0.1:1337/login',
        type: 'post',
        data: $('#loginUser').serialize(),
        success: function(data) {
            // On success => store JSON web token, Redirect
            sessionStorage.setItem('jwt', data['token']);
            window.location.replace('./index.html');
        },
        error: function(data) {
            console.log(data)
            // Error
            messageBox.getElementsByTagName('h3')[0].innerText = "Login Error"
            messageBox.getElementsByTagName('p')[0].innerText = "Account doesn't exist or wrong password."
            document.getElementById('loginUser').appendChild(messageBox);
        }
    });
    event.preventDefault();
});
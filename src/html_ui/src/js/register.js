// If login-ed redirect
if (sessionStorage.getItem('jwt')) {
    window.location.replace('./index.html');
}

// Clone and Remove Template Object
let errorMessage = document.getElementById('errorMessage');
let messageBox = errorMessage.cloneNode(true);
errorMessage.remove();

// On form submit
$('#registerUser').submit(function(event) {
    // Post to url
    $.ajax({
        url:'http://127.0.0.1:1337/registerUser',
        method : 'post',
        data: $('#registerUser').serialize(),
        success: function(data) {
            // On success
            console.log(data);
            if (data["errorMessage"]) {
                // Error
                messageBox.getElementsByTagName('h3')[0].innerText = data["errorMessage"]["name"];
                messageBox.getElementsByTagName('p')[0].innerText = data["errorMessage"]["message"];
                document.getElementById('registerUser').appendChild(messageBox);
            } else {
                // No Error => Redirect
                window.location.replace('./login.html');
            }
        },
        error: function(data) {
            console.log(data)
        }
    });
    event.preventDefault();
});


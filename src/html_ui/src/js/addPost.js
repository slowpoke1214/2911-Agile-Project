if (!(sessionStorage.getItem('jwt'))) {
    window.location.replace('./index.html');
}

$('#addPost').submit(function(event) {
    event.preventDefault();
    let token = sessionStorage.getItem('jwt');
    let tags = document.getElementById('tagInput').value.split(', ');
    tags = tags.map(tag => {
        return tag.trim()
    });
    $.ajax({
        url:'http://127.0.0.1:1337/post/addPost',
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + token
        },
        data: JSON.stringify({
            'title': document.getElementById('titleInput').value,
            'content': document.getElementById('contentInput').value,
            'tag': tags
        }),
        dataType: 'json',
        success: function(data) {
            console.log(data)
            if (data["errorMessage"]) {
                console.log(data["errorMessage"]);
            } else {
                window.location.replace('./index.html');
            }
        }
    });
});
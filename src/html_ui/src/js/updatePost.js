// on document load
$( function() {
    //get id from url
    let id = new URL(location.href).searchParams.get('_id')

    let token = sessionStorage.getItem('jwt');

    // Get title in html
    let title = document.getElementById('title');

    // Get textarea in html
    let contentInput = document.getElementById('contentInput');
    
    // Get tags in html
    let tagList = document.getElementById('tagList');

    //send get request to http://127.0.0.1:1337/post/view to get 
    $.ajax({
        url: 'http://127.0.0.1:1337/post/view?_id=' + id,
        method: 'get',
        success: function(result) {
            let post = result.post;
            title.innerText = post.title;
            contentInput.value = post.content;
            post.tag.forEach(tag => {
                let listitem = document.createElement('a');
                    listitem.innerText = tag;
                tagList.append(listitem);
            });
        }
    })

    $('#updatePost').submit((event) => {
        event.preventDefault();
        $.ajax({
            url: 'http://127.0.0.1:1337/post/update',
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + token
            },
            data: JSON.stringify({
                'id': id,
                'content': contentInput.value
            }),
            dataType: 'json',
            success: function(data) {
                console.log(data);
                if (data["errorMessage"]) {
                    console.log(data["errorMessage"]);
                } else {
                    window.location.replace('./replyPost.html?_id=' + id);
                }
            }
        })
    })

})
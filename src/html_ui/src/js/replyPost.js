
$(function() {
    let postNode = document.getElementsByClassName('post')[0];
    let postObj = postNode.cloneNode(true);
    postNode.remove()
    let id = new URL(location.href).searchParams.get('_id')
    console.log("7",id)//---------------------------
    $.ajax({
        url: 'http://127.0.0.1:1337/post/view?_id='+id,
        method: 'get',
        success: function(data) {
            console.log(data);
            let element = data.post
            // data["post"].forEach(element => {
            let postlot = document.getElementById('postlot');
            let newPost = postObj.cloneNode(true);
            let tags = newPost.getElementsByClassName('tags')[0];
            let tag = tags.getElementsByTagName('small')[0];
            element['tag'].forEach(value => {
                let newtag = tag.cloneNode(true);
                newtag.innerText = value;
                tags.appendChild(newtag);
            })
            tag.remove();
            // newPost.href = "/post/view?_id=" + element["_id"];
            newPost.getElementsByTagName('h3')[0].innerText = element["title"];
            newPost.getElementsByTagName('p')[0].innerText = element["content"];
            newPost.getElementsByTagName('small')[0].innerText = element["username"];
            postlot.appendChild(newPost)
            // });
            data.comments.forEach(element => {
                let commentArea = document.getElementById("commentArea");
                let block = document.createElement("div")
                let contentElement = document.createElement("p")
                contentElement.innerText = element.content
                block.appendChild(contentElement)
                let nameElement = document.createElement("strong")
                nameElement.innerText = element.username
                block.appendChild(nameElement)
                let timeElement = document.createElement("small")
                timeElement.innerText = element.time
                block.appendChild(timeElement)
                commentArea.prepend(block)
            });
        }
    }) 
});

if (!(sessionStorage.getItem('jwt'))) {
    window.location.replace('./index.html');
}

console.log(new URL(location.href).searchParams.get('_id'))

$('#addComment').submit(function(event) {
    event.preventDefault();
    let token = sessionStorage.getItem('jwt');
    let id = new URL(location.href).searchParams.get('_id')
    console.log("59",id)//---------------------------
    // let tags = document.getElementById('tagInput').value.split(', ');
    let  time = new Date();

    // tags = tags.map(tag => {
    //     return tag.trim()
    // });
    $.ajax({
        url:'http://127.0.0.1:1337/post/view',
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + token
        },
        data: JSON.stringify({
            'title': document.getElementById('title').innerText,
            'content': document.getElementById('toReply').value,
            'time': time.toString()
        }),
        dataType: 'json',
        success: function(data) {
            console.log(data)
            if (data["errorMessage"]) {
                console.log(data["errorMessage"]);
            }
            window.location.replace('./replyPost.html?_id='+id);
        }
    });
});

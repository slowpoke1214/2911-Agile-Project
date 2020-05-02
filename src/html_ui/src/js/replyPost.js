if (!(sessionStorage.getItem('jwt'))) {
    let wrapper = document.getElementById("wrapper");
    let formTag = document.getElementById("addComment");
    let commentArea = document.getElementById("commentArea");
    let p = document.createElement("p")
    p.innerText="You can login to reply to this Post!!!"
    formTag.style.display="none";
    wrapper.insertBefore(p,commentArea)
}

$(function() {
    let postNode = document.getElementsByClassName('post')[0];
    let postObj = postNode.cloneNode(true);
    postNode.remove()
    let id = new URL(location.href).searchParams.get('_id')
    $.ajax({
        url: 'http://127.0.0.1:1337/post/view?_id='+id,
        method: 'get',
        success: function(data) {
            console.log(data);
            let element = data.post

            let postlot = document.getElementById('postlot');
            let newPost = postObj.cloneNode(true);
            let tags = newPost.getElementsByClassName('tags')[0];
            let tag = tags.getElementsByTagName('small')[0];
            element['tag'].forEach(value => {
                let newtag = tag.cloneNode(true);
                newtag.innerText = value;
                //make tags clickable, wrap newtag with <a> tag
                let aTag = document.createElement("a")
                aTag.href = "relatedPost.html"+"?tag=" + value;
                aTag.appendChild(newtag)

                tags.appendChild(aTag);


            })
            tag.remove();
            newPost.getElementsByTagName('h3')[0].innerText = element["title"];
            newPost.getElementsByTagName('p')[0].innerText = element["content"];
            newPost.getElementsByTagName('small')[0].innerText = element["username"];
            postlot.appendChild(newPost)

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

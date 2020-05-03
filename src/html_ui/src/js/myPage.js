
$(function() {
    //make user be able to switch to post zone or comment zone
    let postlot = document.getElementById('postlot');
    let commentArea = document.getElementById("commentArea");
    postlot.style.display = "inline"
    commentArea.style.display = "none"

    let P_btn = $("#pSwitch");
    let C_btn = $("#cSwitch");

    P_btn.on("click",  () => {
        postlot.style.display = "inline";
        commentArea.style.display = "none";
    })
    C_btn.on("click",() => {
        postlot.style.display = "none";
        commentArea.style.display = "inline";
    })

    let token = sessionStorage.getItem('jwt');
    let postNode = document.getElementsByClassName('post')[0];
    let postObj = postNode.cloneNode(true);

    postNode.remove()

    $.ajax({
        url: 'http://127.0.0.1:1337/myPage',
        method: 'get',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + token
        },
        success: function(data) {
            console.log(data);
            data.posts.forEach(element => {
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
                newPost.href = "replyPost.html" + "?_id=" + element["_id"];
                newPost.getElementsByTagName('h3')[0].innerText = element["title"];
                newPost.getElementsByTagName('p')[0].innerText = element["content"];
                newPost.getElementsByTagName('small')[0].innerText = element["username"];
                postlot.appendChild(newPost)

                //add delete button
                let titleNode = newPost.getElementsByTagName('h3')[0];
                let delBtn = document.createElement("button");
                delBtn.innerText = "delete";
                titleNode.parentNode.insertBefore(delBtn,titleNode);

                delBtn.onclick = () => $.ajax({
                    url:'http://127.0.0.1:1337/post/delete?_id='+element._id,
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': 'Bearer ' + token
                    },
                    success:function(data) {
                        if (data.errorMessage){
                            console.log(data);
                            alert("deletion fail!")
                        }else{
                            console.log(postObj)
                            newPost.remove();
                        }
                    }
                })
            });

            data.comments.forEach(element => {
                let block = document.createElement("div")
                let contentElement = document.createElement("p")
                contentElement.innerText = "comment: " + element.content
                block.appendChild(contentElement)
                let nameElement = document.createElement("strong")
                nameElement.innerText = element.username
                block.appendChild(nameElement)
                let timeElement = document.createElement("small")
                timeElement.innerText = element.time
                block.appendChild(timeElement)
                commentArea.prepend(block)
                //add delete button
                let delBtn = document.createElement("button");
                delBtn.innerText = "delete";
                block.insertBefore(delBtn,contentElement);

                //add post title
                let h2 = document.createElement("h2");
                h2.innerText = "Title: " + element.title;
                block.insertBefore(h2,contentElement);


                delBtn.onclick = () =>  $.ajax({
                    url:'http://127.0.0.1:1337/comment/delete?_id='+element._id,
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': 'Bearer ' + token
                    },
                    success:function(data) {
                        if (data.errorMessage){
                            console.log(data);
                            alert("deletion fail!")
                        }else{
                            block.remove();
                        }
                    }
                })
            });
        }
    })
});
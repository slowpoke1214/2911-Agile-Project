$( () => {

    let token = sessionStorage.getItem('jwt');

    $.ajax({
        url: 'http://127.0.0.1:1337/myPage',
        method: 'get',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + token
        },
        success: (result) => {
            result.posts.forEach( data => {
                let post = document.createElement("div");
                    post.className = "post postItem fade-in";
                    post.href = "replyPost.html?_id=" + data._id;
                let postFrame = document.createElement('div');
                let postTitle = document.createElement('h3');
                    postTitle.innerText = data.title;
                let postAuthor = document.createElement('small');
                    postAuthor.innerText = data.username;
                let postTags = document.createElement('div');
                    postTags.className = "tags";
                let postContent = document.createElement('p');
                    postContent.innerText = data.content;
                let deleteButton = document.createElement('button');
                    deleteButton.className = "delBtn fas fa-trash";

                deleteButton.onclick = () => $.ajax({
                    url:'http://127.0.0.1:1337/post/delete?_id=' + data._id,
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': 'Bearer ' + token
                    },
                    success:function(data) {
                        if (data.errorMessage){
                            console.log(data);
                            alert("Deletion failed.")
                        } else {
                            post.remove();
                        }
                    }
                })
                
                data.tag.forEach( tag => {
                    let postTag = document.createElement('a');
                        postTag.innerText = tag;
                        postTag.href = "relatedPost.html?tag=" + tag;
                    postTags.append(postTag);
                })
                    
                postlot.prepend(post);
                post.append(postFrame);
                postFrame.append(postTitle, postAuthor, postTags, postContent, deleteButton);

            })

            result.comments.forEach(data => {
                console.table(data);
                let post = document.createElement("div");
                    post.className = "post commentItem fade-in";
                    post.href = "replyPost.html?_id=" + data.id;
                let postFrame = document.createElement('div');
                let postTitle = document.createElement('h3');
                    postTitle.innerText = 'Reply on ' + data.title;
                let postContent = document.createElement('p');
                    postContent.innerText = data.content;
                let postTime = document.createElement('small');
                    postTime.innerText = new Date(data.time).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
                let deleteButton = document.createElement('button');
                    deleteButton.className = "delBtn fas fa-trash";

                deleteButton.onclick = () => $.ajax({
                    url:'http://127.0.0.1:1337/comment/delete?_id=' + data._id,
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': 'Bearer ' + token
                    },
                    success:function(data) {
                        if (data.errorMessage) {
                            console.log(data);
                            alert("Deletion failed.")
                        }else{
                            post.remove();
                        }
                    }
                })

                postlot.prepend(post);
                post.append(postFrame);
                postFrame.append(postTitle, postTime, postContent, deleteButton);
            })

            $(".postItem").css("display", "block");
            $(".commentItem").css("display", "none");
        }
    })

    // make user be able to switch to post zone or comment zone
    let pSwitch = document.getElementById('pSwitch');
    let cSwitch = document.getElementById('cSwitch');

    $("#pSwitch").on("click", () => {
        pSwitch.className = "active";
        cSwitch.className = "";
        $(".postItem").css("display", "block");
        $(".commentItem").css("display", "none");
    })
    $("#cSwitch").on("click", () => {
        cSwitch.className = "active";
        pSwitch.className = "";
        $(".commentItem").css("display", "block");
        $(".postItem").css("display", "none");
    })
})



if (!(sessionStorage.getItem('jwt'))) {
//     let wrapper = document.getElementById("wrapper");
//     let formTag = document.getElementById("addComment");
//     let commentArea = document.getElementById("commentArea");
//     let p = document.createElement("p")
//     p.innerText="You can login to reply to this Post!!!"
//     formTag.style.display="none";
//     wrapper.insertBefore(p,commentArea)
}

$(function() {

    let wrapper = document.getElementById("wrapper");

    let id = new URL(location.href).searchParams.get('_id')

    $.ajax({
        url: 'http://127.0.0.1:1337/post/view?_id=' + id,
        method: 'get',
        success: data => {
            let postFrame = document.createElement('div');
                postFrame.className = "post fade-in";
            let postTitle = document.createElement('h3');
                postTitle.innerText = data.post.title;
            let postAuthor = document.createElement('small');
                postAuthor.innerText = data.post.username;
            let postTags = document.createElement('div');
                postTags.className = "tags";
            data.post.tag.forEach( tag => {
                let postTag = document.createElement('a');
                    postTag.innerText = tag;
                    postTag.href = "relatedPost.html?tag=" + tag;
                postTags.append(postTag);
            });
            let postContent = document.createElement('p');
                postContent.innerText = data.post.content;

            wrapper.append(postFrame);
            postFrame.append(postTitle, postAuthor, postTags, postContent);

            let commentForm = document.createElement('form');
                commentForm.id = 'addComment';
                commentForm.method = 'POST';
                commentForm.action = 'replyPost.html?_id=' + id;
                commentForm.className = "fade-in";
            let formTitle = document.createElement('h3');
                formTitle.innerText = "Comment";
            let formContent = document.createElement('textarea');
                formContent.rows = 4;
                formContent.placeholder = "Enter your comment here...";
                formContent.required = true;
            let submitBtn = document.createElement('button');
                submitBtn.innerText = "Submit";

            wrapper.append(commentForm);
            commentForm.append(formTitle, formContent, submitBtn);

            $('#addComment').submit(function(event) {
                event.preventDefault();

                let token = sessionStorage.getItem('jwt');
                let time = new Date();
            
                $.ajax({
                    url:'http://127.0.0.1:1337/post/view',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': 'Bearer ' + token
                    },
                    data: JSON.stringify({
                        'id': id,
                        'content': formContent.value,
                        'time': time
                    }),
                    dataType: 'json',
                    success: function(data) {
                        alert('hi');
                        console.log(data)
                        if (data["errorMessage"]) {
                            console.log(data["errorMessage"]);
                        }
                        window.location.replace('./replyPost.html?_id=' + id);
                    }
                });
            });

            let commentArea = document.createElement('div');
                commentArea.id = "commentArea";
            wrapper.append(commentArea);
            
            data.comments.forEach(comment => {
                let commentFrame = document.createElement("div");
                    commentFrame.className = "fade-in";
                let commentContent = document.createElement("p");
                    commentContent.innerText = comment.content;
                let commentAuthor = document.createElement("strong");
                    commentAuthor.innerText = comment.username;
                let commentTime = document.createElement("small");
                    commentTime.innerText = new Date(comment.time).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
                commentFrame.append(commentContent, commentAuthor, commentTime);
                commentArea.prepend(commentFrame);
            });
        }
    }) 

    
    

});


$( () => {

    let postlot = document.getElementById('postlot');

    $.ajax({
        url: 'http://127.0.0.1:1337/post/allPosts',
        method: 'get',
        success: (result) => {
            result.forEach( data => {
                let post = document.createElement("a");
                    post.className = "post fade-in";
                    post.href = "replyPost.html?_id=" + data._id;
                let postFrame = document.createElement('div');
                let postTitle = document.createElement('h3');
                    postTitle.innerText = data.title;
                let postAuthor = document.createElement('small');
                    postAuthor.innerText = data.username;
                let postTags = document.createElement('div')
                    postTags.className = "tags";
                let postContent = document.createElement('p');
                    postContent.innerText = data.content;
            
                data.tag.forEach( tag => {
                    let postTag = document.createElement('a');
                        postTag.innerText = tag;
                        postTag.href = "relatedPost.html?tag=" + tag;
                    postTags.append(postTag);
                })
                    
                postlot.prepend(post);
                post.append(postFrame);
                postFrame.append(postTitle, postAuthor, postTags, postContent);
            })
        }
    })
    
})
$(function() {
    let postNode = document.getElementsByClassName('post')[0];
    let postObj = postNode.cloneNode(true);
    postNode.remove()
    let tag = new URL(location.href).searchParams.get('tag')

    $.ajax({
        url: 'http://127.0.0.1:1337/post/tag?tag='+tag,
        method: 'get',
        success: function(data) {
            console.log(data);

            data.forEach(element => {
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

            });
        }
    }) 
});
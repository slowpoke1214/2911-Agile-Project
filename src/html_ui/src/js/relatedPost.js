$(function() {
    // let postNode = document.getElementsByClassName('post')[0];
    // let postObj = postNode.cloneNode(true);
    // postNode.remove()
    let postlot = document.getElementById('postlot');
    let tag = new URL(location.href).searchParams.get('tag')

    $.ajax({
        url: 'http://127.0.0.1:1337/post/tag?tag='+tag,
        method: 'get',
        success: function(data) {
            console.log(data);

            data.forEach(element => {
                
                let div  = document.createElement("div");
                
                let title  = document.createElement("h3");
                div.appendChild(title);
                
                let username  = document.createElement("small");
                div.appendChild(username);
                
                let tags = document.createElement("div")
                tags.className = "tags";
                div.appendChild(tags);
                
                let content = document.createElement("p");
                div.appendChild(content);
                
                
                let a  = document.createElement("a");
                a.className = "post";
                a.appendChild(div)
                

            element['tag'].forEach(value => {
                let tag = document.createElement("small");
                tag.innerText = value;
                //make tags clickable, wrap tag with <a> tag
                let aTag = document.createElement("a")
                aTag.href = "relatedPost.html"+"?tag=" + value;
                aTag.appendChild(tag)

                tags.appendChild(aTag);
            })

            a.href = "replyPost.html" + "?_id=" + element["_id"];
            a.getElementsByTagName('h3')[0].innerText = element["title"];
            a.getElementsByTagName('p')[0].innerText = element["content"];
            a.getElementsByTagName('small')[0].innerText = element["username"];
            postlot.appendChild(a)

            });
        }
    }) 
});
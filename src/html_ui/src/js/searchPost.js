$(function() {

        
    let search = new URL(location.href).searchParams.get('search')
    
    $.ajax({
        url: 'http://127.0.0.1:1337/post/search?search='+search,
        method: 'get',
        success: function(data) {
            console.log("data",data);//--------------------

            let newdata = data;
            let re = new RegExp(search,"gi")
            newdata.titles.forEach((value,index) => {
                newdata.titles[index].title = newdata.titles[index].title.replace(re,"<span>"+search+"</span>");
            })
            newdata.contents.forEach((value,index) => {
                newdata.contents[index].content = newdata.contents[index].content.replace(re,"<span>"+search+"</span>");
            })
            newdata.tags.forEach((value,index) => {
                newdata.tags[index].tag.map((v,i) =>{
                    newdata.tags[index].tag[i] = newdata.tags[index].tag[i].replace(re,"<span>"+search+"</span>");
                })
            })
            console.log("newdata",newdata);//-----------------
            
            newdata = newdata.titles.concat(newdata.contents,newdata.tags);

            let newdata1 = []
            for (let i =0;i < newdata.length;i++){
                let exist = false;
                for (let j = 0; j < newdata1.length; j++) {
                    if(newdata[i]._id === newdata1[j]._id){
                        exist = true;
                        break;
                    }
                }
                if(exist === false){
                    newdata1.push(newdata[i]);
                }
            }

            

            // let str_html = ""
            let html = ""
            newdata1.forEach(element => {
                let tags = element.tag.map((t) => {
                    return `<a href="relatedPost.html?tag=${t}">${t}</a>`
                }).join("")

                html += `
                <a class="post fade-in" href="replyPost.html?_id=${element["_id"]}">
                    <div>
                        <h3>${element.title}</h3>
                        <small>${element.username}</small>
                        <span class="tags">
                            <object>
                            ${tags}
                            </object>
                        </span>
                        <p>${element.content}</p>
                    </div>
                </a>
                `
                

            })
            console.log(html)
            let postlot = document.getElementById("postlot");
            postlot.innerHTML = html;


            //create filter bolck
            let filterBlock = document.createElement("div")
            filterBlock.id = "filterBlock";
            let wrapper = document.getElementById("wrapper");
            wrapper.prepend(filterBlock);
        
            let filterOption = ["titles","contents","tags"]
            filterOption.forEach(element => {
                let btn = document.createElement("button");
                btn.innerText = element;
                btn.id = element;
                filterBlock.appendChild(btn);

                btn.onclick = function() {
                    btn.style.backgroundColor = btn.style.backgroundColor === "grey" ? "mediumseagreen" : "grey";
                    //get the data needed to display (duplicate)
                    let newdata = []
                    if (document.getElementById("titles").style.backgroundColor !== "grey"){
                        newdata = newdata.concat(data.titles)
                    }
                    if (document.getElementById("contents").style.backgroundColor !== "grey"){
                        newdata = newdata.concat(data.contents)
                    }
                    if (document.getElementById("tags").style.backgroundColor !== "grey"){
                        newdata = newdata.concat(data.tags)
                    }
                    console.log(newdata)//---------------------------
                    // take away the duplicate data and assign it to newdata1
                    let newdata1 = []
                    for (let i =0;i < newdata.length;i++){
                        let exist = false;
                        for (let j = 0; j < newdata1.length; j++) {
                            if(newdata[i]._id === newdata1[j]._id){
                                exist = true;
                                break;
                            }
                        }
                        if(exist === false){
                            newdata1.push(newdata[i]);
                        }
                    }
                    console.log(newdata1)//---------------------------

                    // insert the data into html
                    let html = ""
                    newdata1.forEach(element => {
                        let tags = element.tag.map((t) => {
                            return `<a href="relatedPost.html?tag=${t}">${t}</a>`
                        }).join("")
        
                        html += `
                        <a class="post" href="replyPost.html?_id=${element["_id"]}">
                            <div>
                                <h3>${element.title}</h3>
                                <small>${element.username}</small>
                                <span class="tags">
                                    <object>
                                    ${tags}
                                    </object>
                                </span>
                                <p>${element.content}</p>
                            </div>
                        </a>
                        `
                        
                    })
                    let postlot = document.getElementById("postlot");
                    postlot.innerHTML = html

                }
        
            })
            
        }
    }) 
});
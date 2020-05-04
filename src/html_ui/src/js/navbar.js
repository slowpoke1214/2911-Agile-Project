//add search bar to nav column

//create input element
let input = document.createElement("input");
input.type = "text";
input.placeholder = "search here...";
//create button element
let button = document.createElement("button");
button.innerText = "search";
//put input and button elements into a div element
let li = document.createElement("li");
li.id="searchBar";
li.appendChild(input);
li.appendChild(button);
//put li element into nav column, right after login/logout element
let login = document.getElementById('navItemLogin');
login.parentElement.appendChild(li)



// Display Menu Item Based on login state
if (sessionStorage.getItem('jwt')) {
    document.getElementById('navItemRegister').remove();
    document.getElementById('navItemLogin').remove();
} else {
    document.getElementById('navItemLogout').remove();
    document.getElementById('navItemAddPost').remove();
    document.getElementById('navItemMyPage').remove();
}

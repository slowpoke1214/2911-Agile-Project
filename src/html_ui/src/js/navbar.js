//add search bar to nav column

//create input element
let input = document.createElement("input");
    input.id = "searchInput";
    input.type = "text";
    input.placeholder = "Search Here...";
//create button element
let button = document.createElement("button");
    button.innerText = "🔍";
//put input and button elements into a div element
let searchForm = document.createElement("form");
    searchForm.id="searchBar";
    searchForm.appendChild(input);
    searchForm.appendChild(button);
//put form element into nav column, right after login/logout element
let login = document.getElementById('navItemLogin');
login.parentElement.appendChild(searchForm)



// Display Menu Item Based on login state
if (sessionStorage.getItem('jwt')) {
    document.getElementById('navItemRegister').remove();
    document.getElementById('navItemLogin').remove();
} else {
    document.getElementById('navItemLogout').remove();
    document.getElementById('navItemAddPost').remove();
    document.getElementById('navItemMyPage').remove();
}

$('#searchBar').submit( function(event) {
    event.preventDefault();
    window.location.replace('.//searchPost.html?search=' + input.value);
})
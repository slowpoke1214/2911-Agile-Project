// Display Menu Item Based on login state
if (sessionStorage.getItem('jwt')) {
    document.getElementById('navItemRegister').remove();
    document.getElementById('navItemLogin').remove();
} else {
    document.getElementById('navItemLogout').remove();
    document.getElementById('navItemAddPost').remove();
}

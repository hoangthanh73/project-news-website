'use strict'

// Tạo OBJ curentUser
let currentUser = parseUser(JSON.parse(getFromStorage('CURRENT_USER', '{}')));

// select btn
const btnLogout = document.getElementById('btn-logout');

// Giao diện hiện thị tùy vào việc người dùng đã đăng nhập hay chưa
const displayScreen = () => {
    const mainContent = document.getElementById('main-content');
    const loginModal = document.getElementById('login-modal');
    const welcomeMessage = document.getElementById('welcome-message');
    if (!currentUser.userName) {
        // Khi người dùng chưa đăng nhập
        mainContent.style.display = 'none';
    } else {
        // Khi người dùng đã đăng nhập
        loginModal.style.display = 'none';
        welcomeMessage.innerHTML = `Welcome ${currentUser.firstName}`;
    }
}
displayScreen();

// Logout tài khoản người dùng khi click vào btn Logout
btnLogout.addEventListener('click', () => {
    localStorage.removeItem('CURRENT_USER');
    currentUser = '';
    window.location.href = './pages/login.html';
})
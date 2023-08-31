'use strict'

// khai báo mảng user và user đang đăng nhập
const userArr = JSON.parse(getFromStorage('USER_ARR', '[]'));
let currentUser = parseUser(JSON.parse(getFromStorage('CURRENT_USER', '{}')));

// select các element
const userNameEl = document.getElementById('input-username');
const passwordEl = document.getElementById('input-password');
const btn = document.getElementById('btn-submit');

// hàm validate dữ liệu
const validate = () => {
    if (!userNameEl.value || !passwordEl.value) {
        alert('Vui lòng nhập đầy đủ dữ liệu!');
        return false;
    } else {
        return true;
    }
}

// Kiểm tra tên đăng nhập và mật khẩu nếu đúng thì lưu curentUser vào localStorage
const checkAcc = (arr) => {
    const acc = arr.filter(el => el.userName === userNameEl.value)[0];
    if (!acc || acc.password !== passwordEl.value) {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    } else {
        saveToStorage('CURRENT_USER', acc);
        currentUser = parseUser(acc);
        window.location.href = '../index.html';
    }
}

// bắt sự kiện khi click vào login btn
btn.addEventListener('click', () => {
    if (validate()) {
        checkAcc(userArr);
    }
})

'use strict'

// select các trường input
const firstNameEl = document.getElementById('input-firstname');
const lastNameEl = document.getElementById('input-lastname');
const userNameEl = document.getElementById('input-username');
const passwordEl = document.getElementById('input-password');
const confirmPasswordEl = document.getElementById('input-password-confirm');
const btn = document.getElementById('btn-submit');

// lấy mảng user từ localStorage
const userArr = JSON.parse(getFromStorage('USER_ARR', '[]'))

// validate dữ liệu đăng ký tài khoản
const validate = () => {
    if (!firstNameEl.value ||
        !lastNameEl.value ||
        !userNameEl.value ||
        !passwordEl.value ||
        !confirmPasswordEl) {
        alert('Vui lòng nhập đầy đủ dữ liệu!');
        return false;
    }
    for (let i = 0; i < userArr.length; i++) {
        if (userArr[i].userName === userNameEl.value) {
            alert('Tên đăng nhập đã được sử dụng!');
            return false;
        }
    }
    if (userNameEl.value.match(/\W/)) {
        alert('Tên đăng nhập chỉ được bao gồm chữ, số và dấu gạch dưới!');
        return false;
    }
    if (passwordEl.value.length < 8) {
        alert('Mật khẩu phải nhiều hơn 8 ký tự!');
        return false;
    }
    if (confirmPasswordEl.value !== passwordEl.value) {
        alert('confirm password và password phải giống nhau!');
        return false;
    }
    return true;
}

// xóa dữ liệu trường input
function clearInputField() {
    firstNameEl.value = '';
    lastNameEl.value = '';
    userNameEl.value = '';
    passwordEl.value = '';
    confirmPasswordEl.value = '';
}

// lưu dữ liệu vào localStorage
function saveData() {
    userArr.push(new User(firstNameEl.value, lastNameEl.value, userNameEl.value, passwordEl.value));
    saveToStorage('USER_ARR', userArr);
}

// Click vào btn thì tiến hành validate dữ liệu, lưu dữ liệu valf localStorage, xóa truòng input, 
btn.addEventListener('click', function () {
    if (validate()) {
        saveData();
        clearInputField();
        alert('Đăng ký thành công!');
    }
})


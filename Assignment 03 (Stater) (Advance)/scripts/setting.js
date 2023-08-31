'use strict'

const userArr = JSON.parse(getFromStorage('USER_ARR', '[]'));
let currentUser = JSON.parse(getFromStorage('CURRENT_USER', '[]'));
const saveBtn = document.getElementById('btn-submit');
const pageSizeEl = document.getElementById('input-page-size');
const categoryEl = document.getElementById('input-category');

const beforeSettings = () => {
    pageSizeEl.value = currentUser.pageSize;
    categoryEl.value = currentUser.category;
}
beforeSettings();

// Hàm validate dữ liệu 
const validate = () => {
    if (!pageSizeEl.value || !categoryEl.value) {
        alert('Bạn phải nhập đầy đủ các trường!')
        return false;
    } else {
        return true;
    }
}

// hàm lưu cài đặt
const saveSettings = () => {
    // kiểm tra người dùng đã đăng nhập hay chưa
    if (!currentUser.userName) {
        alert('Bạn phải đăng nhập để tiến hành cài đặt!');
    } else {
        if (validate()) {
            userArr.forEach((user, i) => {
                currentUser.pageSize = pageSizeEl.value;
                currentUser.category = categoryEl.value;
                if (user.userName === currentUser.userName) {
                    userArr[i].pageSize = pageSizeEl.value;
                    userArr[i].category = categoryEl.value;
                }
            });
            saveToStorage('USER_ARR', userArr);
            saveToStorage('CURRENT_USER', currentUser);
            alert('Lưu cài đặt thành công!');
        }
    }
}

// Sự kiện khi bạn click vào button Save Settings
saveBtn.addEventListener('click', saveSettings);

'use strict'

// lưu data vào localStorage
const saveToStorage = (key, val) =>
    localStorage.setItem(key, JSON.stringify(val));

// Lấy data từ localStorage về client
const getFromStorage = (key, defult) =>
    localStorage.getItem(key) ?? defult;

'use strict'

// tạo class User
class User {
    constructor(firstName, lastName, userName, password, pageSize = 5, category = 'sports') {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;

        this.pageSize = pageSize;
        this.category = category;
    }
}

// Hàm chuyển đôi từ JS object sang Class Instance
const parseUser = usertData =>
    new User(usertData.firstName, usertData.lastName, usertData.userName, usertData.password);

// Tạo class todoTask
class TodoTask {
    constructor(owner, task, isDone = false) {
        this.owner = owner;
        this.task = task;
        this.isDone = isDone;
    }
}
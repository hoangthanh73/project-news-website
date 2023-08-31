'use strict'

// Select các Element
const container = document.getElementById('todo-list');
const taskInputEl = document.getElementById('input-task');
const addtaskBtn = document.getElementById('btn-add');

// Khai báo mảng task
const taskArr = JSON.parse(getFromStorage('TASK_ARR', '[]'));
let currentUser = parseUser(JSON.parse(getFromStorage('CURRENT_USER', '[]')));

// Thêm task vào taskArr
const addTask = () => {
    if (!currentUser.userName) {
        // Kiểm tra người dùng đăng nhập hay chưa
        alert('Bạn phải đăng nhập để sử dụng tính năng này!');
        return;
    } else {
        if (!taskInputEl.value) {
            // Kiểm tra người dùng đã điền vào task Input hay chưa
            alert('Phải nhập thông tin vào trường input!')
        } else {
            // Thêm task vào taskArr, lưu vào localStorage và render ra trình duyệt
            taskArr.push(new TodoTask(currentUser.userName, taskInputEl.value));
            saveToStorage('TASK_ARR', taskArr);
            renderTask(taskArr);
            taskInputEl.value = '';
        }
    }
}
addtaskBtn.addEventListener('click', addTask);

// render task ra trình duyệt
const renderTask = (taskArr) => {
    const checkIsDone = (status) => {
        return status ? 'checked' : '';
    }

    const taskArrTemp = taskArr.map((el, i) => {
        return {
            id: i,
            task: el.task,
            owner: el.owner,
            isDone: el.isDone
        };
    })

    const htmls = taskArrTemp.filter(
        (el) => el.owner === currentUser.userName)
        .map(
            el => `<li class="${checkIsDone(el.isDone)}"
            onclick="displayStatus(${el.id}, event)">${el.task}
            <span class="close" onclick="deleteTask(${el.id}, event)">x</span></li>`)
        .join('');
    container.innerHTML = htmls;
}
renderTask(taskArr);

// Thay đổi trạng thái của task
const displayStatus = (id, e) => {
    e.target.classList.toggle('checked');
    taskArr[id].isDone = taskArr[id].isDone ? false : true;
    saveToStorage('TASK_ARR', taskArr);
}

// Xóa task
const deleteTask = (id, e) => {
    e.stopPropagation();
    taskArr.splice(id, 1);
    saveToStorage('TASK_ARR', taskArr);
    renderTask(taskArr);
}
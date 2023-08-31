'use strict'

// khai báo user đang đăng nhập
let currentUser = JSON.parse(getFromStorage('CURRENT_USER', '[]'));

// hàm render tin tức ra trình duyệt
const renderData = (data) => {
    if (data.length === 0) {
        alert('Có lỗi xảy ra, vui lòng kiểm tra lại!')
    } else {
        const container = document.getElementById('news-container');
        const htmls = data.map(el => `<div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="${el.urlToImage}"  class="card-img" alt="${el.title}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${el.title}</h5>
                    <p class="card-text">${el.description}</p>
                    <a href="${el.url}" class="btn btn-primary">View</a>
                </div>
            </div>
        </div>
    </div>
</div>`).join('');
        container.innerHTML = htmls;
    }
}

// Hàm lấy dữ liệu từ api
const getData = async (path) => {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(response.status);
    }
    return response.json();
}

// Hàm xử lý dữ liệu trả về từ api
const executed = (path) => {
    getData(path)
        .then(data => {
            renderData(data.articles);
            return data;
        })
        .then(
            data => {
                changePage(data)
                return data;
            })
        .catch(err => alert('Có lỗi xảy ra: ' + err));
}

// Hàm chuyển trang tin tức
const changePage = (data1) => {
    const totalResults = data1.totalResults;
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    const pageNumEl = document.getElementById('page-num');
    let pageNum = Number(pageNumEl.textContent);

    // hiện thị btn prev và btn next
    const displayBtn = () => {
        nextBtn.style.display = 'block';
        prevBtn.style.display = 'block';

        if (pageNum <= 1) {
            prevBtn.style.display = 'none';
        }
        if (pageNum >= totalResults / Number(pageSize)) {
            nextBtn.style.display = 'none';
        }
    }

    // Bắt sự kiện khi click vào next btn
    nextBtn.addEventListener('click', function () {
        pageNum++;
        pageNumEl.textContent = pageNum;
        displayBtn();
        executed(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${pageNum}&apiKey=${apiKey}`);
    });

    // Bắt sự kiện khi click vào prev btn
    prevBtn.addEventListener('click', function () {
        displayBtn();
        pageNum--;
        pageNumEl.textContent = pageNum;
        displayBtn();
        executed(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${pageNum}&apiKey=${apiKey}`);
    })
}

// Render tin tức lên trang web
const country = `us`
const apiKey = `8259f50111274fec857d4bfb9a0428a1`;
const pageSize = currentUser.pageSize;
const category = `${currentUser.category}`;
executed(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=1&apiKey=${apiKey}`);

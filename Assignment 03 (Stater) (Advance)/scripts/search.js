'use strict';

const inputSearch = document.getElementById('input-query');
const btnSearch = document.getElementById('btn-submit');
const apiKey = '8259f50111274fec857d4bfb9a0428a1';
const pageSize = 20;

// Render dữ liệu trả ra từ api lên trình duyệt
const renderData = (data) => {
    const container = document.getElementById('news-container');
    let htmls = '';
    if (data.length === 0) {
        htmls = `<div>Không tìm thấy kết quả</div>`
    } else {
        htmls = data.map(el =>
            `<div class="card flex-row flex-wrap">
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
    }
    container.innerHTML = htmls;
}

// Lấy data từ api
const getData = async (path) => {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error('Có lỗi xảy ra: ' + response.status);
    }
    return response.json();
}

// Hàm thực thi sau khi lấy được data tư api
const executed = (path) => {
    getData(path)
        .then(data => {
            renderData(data.articles);
            return data;
        })
        .then(
            data => {
                changePages(data);
            })
        .catch(error => alert('Something went wrong: ', error))
}

// Chuyển đổi trang kết quả tìm kiếm
const changePages = (data) => {
    const nextBtn = document.getElementById('btn-next');
    const prevBtn = document.getElementById('btn-prev');
    const pageNumEl = document.getElementById('page-num');
    let pageNum = Number(pageNumEl.textContent);
    const totalResults = data.totalResults;

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
    displayBtn();

    // Bắt sự kiện khi click vào next btn
    nextBtn.addEventListener('click', function () {
        displayBtn();
        pageNum++;
        pageNumEl.textContent = pageNum;
        executed(`https://newsapi.org/v2/everything?q=${inputSearch.value}&pageSize=${pageSize}&page=${pageNum}&apiKey=${apiKey}`)
    });

    // Bắt sự kiện khi click vào prev btn
    prevBtn.addEventListener('click', function () {
        displayBtn();
        pageNum--;
        pageNumEl.textContent = pageNum;
        executed(`https://newsapi.org/v2/everything?q=${inputSearch.value}&pageSize=${pageSize}&page=${pageNum}&apiKey=${apiKey}`);
    })
}

// Validate và xử lý sự kiện khi click vào button search
const searchNews = () => {
    if (!inputSearch.value) {
        alert('Bạn phải nhập vào 1 keyword!');
    } else {
        const endpoint = `https://newsapi.org/v2/everything?q=${inputSearch.value}&pageSize=${pageSize}&apiKey=${apiKey}`
        executed(endpoint)
    }
}

// Khi click vào search btn
btnSearch.addEventListener('click', searchNews);


[...document.querySelectorAll(".drop-down")].forEach(function (item) {
    item.addEventListener("change", function () {
        const dropDownId = item.id.slice(0, -3);
        const dropDown = document.getElementById(dropDownId + "DD");
        if (item.value === "more") {
            dropDown.classList.toggle("d-none");
        }
        if (item.value !== "more" && !dropDown.classList.contains("d-none")) {
            dropDown.classList.toggle("d-none");
        }
    });
});
[...document.querySelectorAll(".naziv-kategorija")].forEach(function (item) {
    item.addEventListener("input", function () {
        const listItem = item.id + "li";
        const li = document.getElementById(listItem);
        li.innerHTML = item.value;
    });
});
[...document.querySelectorAll(".boja-kategorija")].forEach(function (item) {
    item.addEventListener("input", function () {
        const bojaKategorija = item.id.slice(0, -4);
        const li = document.getElementById(bojaKategorija + "li");
        li.style = `color: ${item.value}`;
    });
});
let categoryNum = [];
[...document.querySelectorAll(".kategorija")].forEach(function (item) {
    const id = parseInt(item.id);
    categoryNum.push(id);
    return categoryNum;
});
categoryNum = categoryNum[categoryNum.length - 1];
const addDisplayNone = () => {
    [...document.querySelectorAll(".kategorija")].forEach(function (item) {
        const id = parseInt(item.id);
        item.classList.add("d-none");
        if (id <= 5) {
            item.classList.remove("d-none");
        }
    });
};
addDisplayNone();
const previous = document.getElementById("previous");
const next = document.getElementById("next");
let pageStart = 0;
next.addEventListener("click", function () {
    pageStart += 5;
    if (pageStart == 0) {
        pageStart = 5;
    }
    let pageEnd = pageStart + 5;
    if (pageEnd > categoryNum + 4) {
        pageStart = 0;
        pageEnd = 5;
    }
    [...document.querySelectorAll(".kategorija")].forEach(function (item) {
        const id = parseInt(item.id);
        if (id <= pageStart || id > pageEnd) {
            item.classList.add("d-none");
        } else {
            item.classList.remove("d-none");
        }
    });
    return pageStart;
});
previous.addEventListener("click", function () {
    pageStart -= 5;
    if (pageStart == -5) {
        let start = Math.floor(categoryNum / 5);
        pageStart = start * 5;
        if (pageStart == 5) {
            pageStart = 0;
        }
    }
    let pageEnd = pageStart + 5;
    [...document.querySelectorAll(".kategorija")].forEach(function (item) {
        const id = parseInt(item.id);
        if (id <= pageStart || id > pageEnd) {
            item.classList.add("d-none");
        } else {
            item.classList.remove("d-none");
        }
    });
    return pageStart;
});

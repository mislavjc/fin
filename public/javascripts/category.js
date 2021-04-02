// !Show dropdown
[...document.querySelectorAll(".drop-down")].forEach(function (item) {
    item.addEventListener("change", function () {
        const dropDownId = item.id.slice(0, -4);
        const dropDown = document.getElementById(dropDownId + "DD");
        if (item.value === "more") {
            dropDown.classList.toggle("d-none");
        }
        if (item.value !== "more" && !dropDown.classList.contains("d-none")) {
            dropDown.classList.toggle("d-none");
        }
    });
});
// !Category title
[...document.querySelectorAll(".category-name")].forEach(function (item) {
    item.addEventListener("input", function () {
        const listItem = item.id + "li";
        const li = document.getElementById(listItem);
        li.innerHTML = item.value;
    });
});
// !Color picker
[...document.querySelectorAll(".category-color")].forEach(function (item) {
    item.addEventListener("input", function () {
        const categoryColor = item.id.slice(0, -5);
        const li = document.getElementById(categoryColor + "li");
        li.style = `color: ${item.value}`;
    });
});
// !Required button
[...document.querySelectorAll(".required-button")].forEach(function (item) {
    let count = 0;
    item.addEventListener("click", function () {
        const requiredButton = item.id.slice(0, -8);
        console.log(requiredButton)
        const label = document.getElementById(requiredButton + "ReqLabel");
        if (count % 2 == 0) {
            label.innerHTML = "Da"
        } else {
            label.innerHTML = "Ne"
        }
        count++;
    });
});
// !Count # of categories
let categoryNum = [];
[...document.querySelectorAll(".category")].forEach(function (item) {
    const id = parseInt(item.id);
    categoryNum.push(id);
    return categoryNum;
});
categoryNum = categoryNum[categoryNum.length - 1];
// !Remove all but first 5
const addDisplayNone = () => {
    [...document.querySelectorAll(".category")].forEach(function (item) {
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
// !Next page
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
    [...document.querySelectorAll(".category")].forEach(function (item) {
        const id = parseInt(item.id);
        if (id <= pageStart || id > pageEnd) {
            item.classList.add("d-none");
        } else {
            item.classList.remove("d-none");
        }
    });
    return pageStart;
});
// !Previous page
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
    [...document.querySelectorAll(".category")].forEach(function (item) {
        const id = parseInt(item.id);
        if (id <= pageStart || id > pageEnd) {
            item.classList.add("d-none");
        } else {
            item.classList.remove("d-none");
        }
    });
    return pageStart;
});
// !Progress bar
const progressBar = document.querySelector(".progress-bar");
for (let i = 33; i < 67; i++) {
    setTimeout(function () {
        progressBar.style = `width: ${i}%`;
    }, i * 25);
}

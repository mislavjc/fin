const range = document.getElementById("brojKategorija");
const kategorijeValue = document.getElementById("kategorijeValue");
const prva = document.getElementById("num1");
const valueArr = [1];
prva.classList.toggle("d-none");
range.addEventListener("input", function () {
    let value = parseInt(range.value);
    valueArr.push(value);
    const list = document.getElementById(`num${value}`);
    if (value != 1) {
        list.classList.remove("d-none");
    }
    kategorijeValue.innerHTML = "Broj kategorija: " + value;
    if (valueArr[valueArr.length - 2] > valueArr[valueArr.length - 1]) {
        valueArr.splice(-2);
        document
            .getElementById(`num${valueArr.length + 1}`)
            .classList.add("d-none");
    }
});
// !Progress bar
const progressBar = document.querySelector(".progress-bar");
for (let i = 0; i < 34; i++) {
    setTimeout(function () {
        progressBar.style = `width: ${i}%`;
    }, i * 25);
}

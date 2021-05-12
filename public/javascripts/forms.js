const input = document.getElementById("numOfCategories");
const valueArr = [1];
input.addEventListener("input", function () {
  let value = parseInt(input.value);
  valueArr.push(value);
  const list = document.getElementById(`num${value}`);
  if (value != 1) {
    list.classList.remove("d-none");
  }
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

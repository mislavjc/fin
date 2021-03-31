const editBtn = document.querySelector("#show-edit");
const showAcc = document.querySelector(".show-account");
const editAcc = document.querySelector(".edit-account");
const back = document.querySelector(".back");
editBtn.addEventListener("click", function () {
    editAcc.classList.toggle("d-none");
    showAcc.classList.toggle("d-none");
});
back.addEventListener("click", function () {
    editAcc.classList.toggle("d-none");
    showAcc.classList.toggle("d-none");
});

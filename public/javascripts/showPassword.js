const password = document.querySelector(".password");
const span = document.querySelector(".password-visibility");
let count = 0;
span.addEventListener("click", () => {
    if (count % 2 === 0) {
        password.type = "text";
    } else {
        password.type = "password";
    }
    count++;
});

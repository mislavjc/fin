// !Password validation

const password = document.getElementById("password");
const progress = document.querySelector(".progress-bar");
password.addEventListener("input", function () {
    console.log(/\d/.test(password.value));
    if (/\d/.test(password.value)) {
        for (let i = 0; i < 50; i++) {
            setTimeout(function () {
                progress.style = `width: ${i}%`;
            }, i * 10);
        }
        if (
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
                password.value
            )
        ) {
            progress.classList.remove("bg-warning");
            progress.classList.add("bg-success");
            for (let i = 50; i < 100; i++) {
                setTimeout(function () {
                    progress.style = `width: ${i}%`;
                }, i * 10);
            }
        }
    }
});

// !Show password

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

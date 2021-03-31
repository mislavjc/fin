let stripe = Stripe(
    "pk_test_51ITlysJBxS5dOQAeTL2le0qc921WNlhav6xOOfNwVyY4DybQ90Hm30bkOq39W0hN3gdoyqMsv5h3vlEJZt3rOTsP00wdUvEBW1"
);
let checkoutButtonStarter = document.getElementById("starter");
checkoutButtonStarter.addEventListener("click", function () {
    fetch("/starter", {
        method: "POST",
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (session) {
            return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
            if (result.error) {
                alert(result.error.message);
            }
        })
        .catch(function (error) {
            console.error("Error:", error);
        });
});
let checkoutButtonPremium = document.getElementById("premium");
checkoutButtonPremium.addEventListener("click", function () {
    fetch("/premium", {
        method: "POST",
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (session) {
            return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
            if (result.error) {
                alert(result.error.message);
            }
        })
        .catch(function (error) {
            console.error("Error:", error);
        });
});
let checkoutButtonEnterprise = document.getElementById("enterprise");
checkoutButtonEnterprise.addEventListener("click", function () {
    fetch("/enterprise", {
        method: "POST",
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (session) {
            return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
            if (result.error) {
                alert(result.error.message);
            }
        })
        .catch(function (error) {
            console.error("Error:", error);
        });
});
// !Progress bar
const progressBar = document.querySelector(".progress-bar");
for (let i = 66; i <= 100; i++) {
    setTimeout(function () {
        progressBar.style = `width: ${i}%`;
    }, i * 25);
}

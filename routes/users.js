const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");

// !Register

router
    .route("/register")
    .get(users.renderRegister)
    .post(catchAsync(users.register));

// !Login

router
    .route("/login")
    .get(users.renderLogin)
    .post(
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login",
        }),
        users.login
    );

// !logout

router.get("/logout", users.logout);

// !Verification

router.get("/verification", users.renderVerify);

router.get("/verification/:id", users.verifyUser);

// !Account

router
    .route("/account/:id")
    .get(catchAsync(users.renderAccount))
    .put(catchAsync(users.editAccount));

module.exports = router;

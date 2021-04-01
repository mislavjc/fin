const User = require("../models/user");
const nodemailer = require("nodemailer");
const cryptoRandomString = require("crypto-random-string");

// !Register

module.exports.renderRegister = (req, res) => {
    res.render("users/register");
};

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        });
        const link = cryptoRandomString({ length: 10 });
        const messageOptions = {
            subject: "Test",
            text: "Link za verifikaciju",
            html: `<a href="fin.com.hr/verification/${link}">Link za verifikaciju</a>`,
            to: email,
            from: "mislav.jovanic@coreline.agency",
        };
        user.verify = link;
        user.timeVerified = Math.floor(Date.now() / 1000);
        await user.save();
        transporter.sendMail(messageOptions);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Uspješno ste se registrirali!");
            res.redirect("/verification");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
    }
};

// !Verification

module.exports.verifyUser = async (req, res) => {
    const user = await User.findById(req.user._id);
    const { id } = req.params;
    const timeNow = Math.floor(Date.now() / 1000);
    const timeBetween = timeNow - user.timeVerified;
    if (user.verify == id) {
        if (timeBetween > 600) {
            req.flash("error", "Vrijeme za verifikaciju je isteklo!");
            res.redirect("/verification");
        } else {
            user.status = "verified";
            res.render("users/verified");
        }
    } else {
        req.flash("error", "Neispravan verifikacijski kod");
        res.redirect("/verification");
    }
    await user.save();
};

module.exports.renderVerify = (req, res) => {
    res.render("users/verify");
};

// !Login

module.exports.renderLogin = (req, res) => {
    res.render("users/login");
};

module.exports.login = (req, res) => {
    req.flash("success", "Dobrodošli nazad!");
    const redirectUrl = req.session.returnTo || "/";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

// !Logout

module.exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "Doviđenja!");
    res.redirect("/");
};

// !Account page

module.exports.renderAccount = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        req.flash("error", "Taj račun ne postoji!");
        return res.redirect("/");
    }
    res.render("users/account", { user });
};

module.exports.editAccount = async (req, res) => {
    2;
    const { id } = req.params;
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(id, { username, email });
    await user.save();
    req.flash("success", "Uspješno promjenjene postavke računa!");
    res.redirect("/login");
};

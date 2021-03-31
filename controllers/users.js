const User = require("../models/user");

// !Register

module.exports.renderRegister = (req, res) => {
    res.render("users/register");
};

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Uspješno ste se registrirali!");
            res.redirect("/");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
    }
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
    const { id } = req.params;
    const { username, email } = req.body;
    console.log(username, email);
    const user = await User.findByIdAndUpdate(id, { username, email });
    await user.save();
    console.log(user)
    req.flash("success", "Uspješno promjenjene postavke računa!")
    res.redirect("/login");
};

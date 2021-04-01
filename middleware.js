const Template = require("./models/template");
const User = require("./models/user");

// !Validation

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const template = await Template.findById(id);
    if (!req.user) {
        res.redirect("/login");
        return next();
    } else {
        if (req.user._id != template.owner) {
            req.flash("error", "Zabranjen pristup!");
            return res.redirect("/");
        }
    }
    next();
};

// !Payment

module.exports.isPaying = async (req, res, next) => {
    const subscriptionPlans = ["Starter", "Premium", "Enterprise"];
    if (!subscriptionPlans.includes(req.user.subscription)) {
        return res.redirect("/checkout");
    }
    next();
};

// !Verification

module.exports.isVerified = async (req, res, next) => {
    if (!req.user) {
        res.redirect("/login")
        return next();
    } else {
        const user = await User.findById(req.user._id);
    if (user.status != "verified") {
        req.flash("error", "Niste verificirali mail");
        return res.redirect("/");
    }
    }
    next();
};

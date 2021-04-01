const Template = require("./models/template");

// !Validation

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const template = await Template.findById(id);
    if (!req.user) {
        res.redirect("/login");
        return next();
    } else {
        if (req.user._id !== template.owner) {
            req.flash("error", "Zabranjen pristup!");
            return res.redirect("/");
        }
    }
    next();
};

// !Payment

module.exports.isPaying = async (req, res, next) => {
    const subscriptionPlans = ["Starter", "Premium", "Enterprise"];
    if (req.user.subscription.includes(subscriptionPlans)) {
        next();
    } else {
        return res.redirect("/checkout");
    }
    next();
};

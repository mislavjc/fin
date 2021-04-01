const FieldType = require("../models/fieldType");
const User = require("../models/user");

// !Broj kategorija form

module.exports.storeNumOfCategories = async (req, res) => {
    const numOfCategories = req.body.category.numOfCategories;
    const user = await User.findByIdAndUpdate(req.user._id, {
        numOfCategories,
    });
    req.user.numOfCategories = req.body.category.numOfCategories;
    await user.save();
    res.redirect("/create/kategorije");
};

module.exports.renderNumOfCategories = (req, res) => {
    res.render("forms/numOfCategories");
};

// !Unos kategorija form

module.exports.storeCategoryNames = async (req, res) => {
    const { category } = req.body;
    const { user } = req;
    for (let i = 0; i < user.numOfCategories; i++) {
        const categoryDD = [];
        if (category.additional) {
            categoryDD.push(req.body.category.additional[i].split(","));
        } else {
            categoryDD.push("");
        }
        const field = {
            name: category.name[i],
            type: category.type[i],
            color: category.color[i],
            additional: categoryDD,
            owner: user._id,
        };

        const fieldType = new FieldType(field);
        await fieldType.save();
    }
    res.redirect("/checkout");
};

module.exports.renderCategoryNames = async (req, res) => {
    res.render("forms/categoryNames");
};

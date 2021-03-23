const CreateForm = require("../models/createForm");
const User = require("../models/user");
const Form = require("../models/form");

module.exports.storeForm = async (req, res) => {
    const form = new Form(req.body.form);
    await form.save();
    req.flash("success", "Uspješno spremljeno!");
    res.redirect("/show");
};

module.exports.renderForm = async (req, res) => {
    const user = req.user._id;
    const formData = await CreateForm.find({ owner: user });
    const kategorijaDD = [];
    for (let i = 0; i < req.user.brojKategorija; i++) {
        if (formData[0].kategorijaDropDown[i].includes(",")) {
            kategorijaDD.push(formData[0].kategorijaDropDown[i].split(","));
        } else {
            kategorijaDD.push("");
        }
    }
    formData[0].kategorijaDD = kategorijaDD;
    const categoryNumber = req.user.brojKategorija;
    res.render("forms/form", { formData, categoryNumber });
};

module.exports.formData = async (req, res) => {
    const user = req.user._id;
    const forms = await Form.find({});
    const formData = await CreateForm.find({ owner: user });
    res.render("forms/show", { forms, formData });
};

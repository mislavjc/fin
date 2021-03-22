const CreateForm = require("../models/createForm");
const User = require("../models/user");
const Form = require("../models/form");

module.exports.renderForm = async (req, res) => {
    const user = req.user._id
    const formData = await CreateForm.find({owner: user});
    console.log(formData[1])
    const categoryNumber = req.user.brojKategorija;
    res.render("forms/form", { formData, categoryNumber});
};

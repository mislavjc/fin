const CreateForm = require("../models/createForm");
const User = require("../models/user");

// !Broj kategorija form

module.exports.storeCreateForm = async (req, res) => {
    const brojKategorija = req.body.createForm.brojKategorija;
    const user = await User.findByIdAndUpdate(req.user._id, { brojKategorija });
    req.user.brojKategorija = req.body.createForm.brojKategorija;
    await user.save();
    res.redirect("/create/kategorije");
};

module.exports.renderCreateForm = (req, res) => {
    res.render("forms/createForm");
};

// !Unos kategorija form

module.exports.storeCreateKategorije = async (req, res) => {
    const createForm = new CreateForm(req.body.createForm);
    createForm.owner = req.user._id;
    await createForm.save();
    res.redirect("/form");
};

module.exports.renderCreateKategorije = async (req, res) => {
    res.render("forms/createKategorije");
};

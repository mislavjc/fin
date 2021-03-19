const CreateForm = require("../models/createForm");

module.exports.storeCreateForm = async (req, res) => {
    const createForm = new CreateForm(req.body.createForm);
    createForm.owner = req.user._id;
    await createForm.save();
    console.log(createForm);
    res.redirect("/create")
};

module.exports.renderCreateForm = (req, res) => {
    res.render("forms/createForm");
};

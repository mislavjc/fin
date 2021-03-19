const CreateForm = require("../models/createForm");

module.exports.storeCreatecreateForm = async (req, res) => {
    const createForm = new CreateForm(req.body.createForm);
    await createForm.save();
    console.log(createForm);
};

module.exports.renderCreateForm = (req, res) => {
    res.render("forms/createForm");
};

const CreateForm = require("../models/createForm");
const User = require("../models/user");
const Form = require("../models/form");

// !Form logic

module.exports.storeForm = async (req, res) => {
    const form = new Form(req.body.form);
    form.owner = req.user._id;
    form.datoteke = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
    }));
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

// !Main show page

module.exports.formData = async (req, res) => {
    const user = req.user._id;
    const forms = await Form.find({ owner: user });
    const formData = await CreateForm.find({ owner: user });
    res.render("forms/show", { forms, formData });
};

// !More info page

module.exports.showForm = async (req, res) => {
    const user = req.user._id;
    const formData = await CreateForm.find({ owner: user });
    const form = await Form.findById(req.params.id);
    res.render("forms/more", { form, formData });
};

// !Edit

module.exports.renderEditForm = async (req, res) => {
    const user = req.user._id;
    const formData = await CreateForm.find({ owner: user });
    const { id } = req.params;
    const form = await Form.findById(id);
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
    if (!form) {
        req.flash("error", "Ta narudžba ne postoji!");
        return res.redirect("/show");
    }
    res.render("forms/edit", { form, formData, categoryNumber });
};

module.exports.updateForm = async (req, res) => {
    const { id } = req.params;
    const form = await Form.findByIdAndUpdate(id, { ...req.body.form });
    const dat = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    form.datoteke.push(...dat);
    await form.save();
    req.flash("success", "Uspješno promjenjena narudžba!");
    res.redirect(`/show/${form._id}`);
};

// !Delete

module.exports.deleteForm = async (req, res) => {
    const { id } = req.params;
    await Form.findByIdAndDelete(id);
    req.flash("success", "Uspješno obrisana narudžba!");
    res.redirect("/show");
};

// !Filter

module.exports.renderFilter = async (req, res) => {
    const user = req.user._id;
    const formData = await CreateForm.find({ owner: user });
    res.render("forms/filter", { formData });
};

module.exports.storeFilter = async (req, res) => {
    const user = req.user._id;
    const filterData = req.body.form.kategorija;
    const forms = await Form.find({ owner: user });
    const filter = {};
    for (let i = 0; i < filterData.length; i++) {
        filter[`kategorija[${i}]`] = filterData[i];
    }
    for (let i = 0; i < filterData.length; i++) {
        if (filter[`kategorija[${i}]`] === "") {
            delete filter[`kategorija[${i}]`];
        }
    }
    console.log(filter);
    for (let i = 0; i < forms.length; i++) {
        narudzbe = {};
        for (let j = 0; j < filterData.length; j++) {
            narudzbe[`kategorija[${j}]`] = forms[i].kategorija[j];
        }
        console.log(narudzbe)
    }
    req.flash("success", "Uspiešno spremljeno!");
    res.redirect("/filter");
};

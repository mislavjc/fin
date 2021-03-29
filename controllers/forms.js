const Category = require("../models/category");
const FieldType = require("../models/fieldType");
const Order = require("../models/order");
const Field = require("../models/field");
const Template = require("../models/template");

// !Form logic

module.exports.storeForm = async (req, res) => {
    const user = req.user._id;
    const fieldType = await FieldType.find({ owner: req.user._id });
    const templates = [];
    for (let i = 0; i < req.body.form.category.length; i++) {
        const field = new Field({
            value: req.body.form.category[i],
            owner: user,
            fieldtype: fieldType[i],
        });
        await field.save();
        templates.push(field);
    }
    const template = new Template();
    template.attachments = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
    }));
    template.owner = user;
    template.fields = templates;
    await template.save();
    res.redirect(`/show/${template._id}`);
};

module.exports.renderForm = async (req, res) => {
    const fieldType = await FieldType.find({ owner: req.user._id });
    res.render("forms/form", { fieldType });
};

// !Main page

module.exports.renderCardView = async (req, res) => {
    const templates = await Template.find({ owner: req.user._id }).populate({
        path: "fields",
        populate: {
            path: "fieldtype",
        },
    });
    res.render("forms/cardView", { templates });
};

// !Edit form

module.exports.updateForm = async (req, res) => {
    const { id } = req.params;
    const template = await Template.findById(id).populate({
        path: "fields",
        populate: {
            path: "fieldtype",
        },
    });
    const attachments = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
    }));
    template.attachments.push(...attachments);
    for (let i = 0; i < req.body.form.category.length; i++) {
        const field = await Field.findByIdAndUpdate(template.fields[i]._id, {
            value: req.body.form.category[i],
        });
        await field.save();
    }
    await template.save();
    req.flash("success", "Uspješno promjenjena narudžba!");
    res.redirect(`/show/${template._id}`);
};

module.exports.renderEditForm = async (req, res) => {
    const fieldType = await FieldType.find({ owner: req.user._id });
    const template = await Template.findById(req.params.id).populate({
        path: "fields",
        populate: {
            path: "fieldtype",
        },
    });
    if (!template) {
        req.flash("error", "Ta narudžba ne postoji!");
        return res.redirect("/show");
    }
    res.render("forms/edit", { fieldType, template });
};

// !Delete order

module.exports.deleteForm = async (req, res) => {
    const { id } = req.params;
    await Template.findByIdAndDelete(id);
    req.flash("success", "Uspješno obrisana narudžba!");
    res.redirect("/show");
};

// !Show form

module.exports.showForm = async (req, res) => {
    const { id } = req.params;
    const template = await Template.findById(id).populate({
        path: "fields",
        populate: {
            path: "fieldtype",
        },
    });
    res.render("forms/more", { template });
};

// !Table view

module.exports.renderTable = async (req, res) => {
    const templates = await Template.find({ owner: req.user._id }).populate({
        path: "fields",
        populate: {
            path: "fieldtype",
        },
    });
    const fieldTypes = await FieldType.find({ owner: req.user._id });
    res.render("forms/table", { templates, fieldTypes });
};

// !Filter logic

// module.epxorts.storeFilter = async (req, res) => {
//     const user = req.user._id;
//     const fieldType = await FieldType.find({ owner: req.user._id });
//     const templates = [];
//     for (let i = 0; i < req.body.form.category.length; i++) {
//         const field = new Field({
//             value: req.body.form.category[i],
//             owner: user,
//             fieldtype: fieldType[i],
//         });
//         await field.save();
//         templates.push(field);
//     }
// }

module.exports.renderFilter = async (req, res) => {
    const fieldType = await FieldType.find({ owner: req.user._id });
    res.render("forms/filter", { fieldType });
};

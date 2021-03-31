const FieldType = require("../models/fieldType");
const Field = require("../models/field");
const Template = require("../models/template");
const { cloudinary } = require("../cloudinary");

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
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await template.updateOne(
            {
                $pull: {
                    attachments: { filename: { $in: req.body.deleteImages } },
                },
            },
            { new: true }
        );
    }
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
    console.log(process.env.SECRET);
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

// !Checkout

const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports.renderCheckout = (req, res) => {
    res.render("stripe/checkout");
};

module.exports.checkoutStarter = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
            {
                price: process.env.STARTER,
                quantity: 1,
            },
        ],
        success_url: "https://fin.com.hr/success",
        cancel_url: "https://fin.com.hr/cancel",
    });
    res.json({ id: session.id });
};

module.exports.checkoutPremium = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
            {
                price: process.env.PREMIUM,
                quantity: 1,
            },
        ],
        success_url: "https://fin.com.hr/success",
        cancel_url: "https://fin.com.hr/cancel",
    });
    res.json({ id: session.id });
};

module.exports.checkoutEnterprise= async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
            {
                price: process.env.ENTERPRISE,
                quantity: 1,
            },
        ],
        success_url: "https://fin.com.hr/success",
        cancel_url: "https://fin.com.hr/cancel",
    });
    res.json({ id: session.id });
};

module.exports.renderSuccess = (req, res) => {
    res.render("stripe/success");
};

module.exports.renderCancel = (req, res) => {
    res.render("stripe/cancel");
};

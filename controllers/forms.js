const FieldType = require("../models/fieldType");
const Field = require("../models/field");
const Template = require("../models/template");
const { cloudinary } = require("../cloudinary");
const User = require("../models/user");

// !Form logic

module.exports.storeForm = async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const fieldType = await FieldType.find({ owner: req.user._id });
    const templates = [];
    for (let i = 0; i < req.body.form.category.length; i++) {
        const field = new Field({
            value: req.body.form.category[i],
            owner: userId,
            fieldtype: fieldType[i],
        });
        await field.save();
        templates.push(field);
    }
    const template = new Template();
    template.attachments = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
        size: f.size,
    }));
    let totalUsage = user.totalUsage;
    template.attachments.forEach((f) => {
        totalUsage += f.size;
    });
    user.totalUsage = totalUsage;
    await user.save();
    template.owner = userId;
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
    const user = await User.findById(req.user._id);
    const template = await Template.findById(id).populate({
        path: "fields",
        populate: {
            path: "fieldtype",
        },
    });
    const attachments = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
        size: f.size,
    }));
    template.attachments.push(...attachments);
    for (let i = 0; i < req.body.form.category.length; i++) {
        const field = await Field.findByIdAndUpdate(template.fields[i]._id, {
            value: req.body.form.category[i],
        });
        await field.save();
    }
    await template.save();
    let totalUsage = user.totalUsage || 0;
    attachments.forEach((f) => {
        totalUsage += f.size;
    });
    user.totalUsage = totalUsage;
    await user.save();
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
    res.render("forms/table", { templates, fieldTypes });
};

// !Filter logic

module.exports.filterOrders = async (req, res) => {
    const values = [];
    for (let i = 0; i < req.body.form.category.length; i++) {
        const value = req.body.form.category[i];
        if (value != "") {
            values.push(value);
        }
    }
    const fields = await Field.find({ value: { $in: values } });
    if (values.length < req.user.numOfCategories) {
        const templates = await Template.find({
            fields: { $in: fields.map((field) => field._id) },
        }).populate({
            path: "fields",
            populate: {
                path: "fieldtype",
            },
        });
        res.render("forms/filterData", { templates });
    } else {
        const templates = await Template.find({
            fields: {
                $not: {
                    $elemMatch: { $nin: fields.map((field) => field._id) },
                },
            },
        }).populate({
            path: "fields",
            populate: {
                path: "fieldtype",
            },
        });
        res.render("forms/filterData", { templates });
    }
};

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
    const user = await User.findByIdAndUpdate(req.user._id, {
        subscription: "Starter",
    });
    await user.save();
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
    const user = await User.findByIdAndUpdate(req.user._id, {
        subscription: "Premium",
    });
    await user.save();
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

module.exports.checkoutEnterprise = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user._id, {
        subscription: "Enterprise",
    });
    await user.save();
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

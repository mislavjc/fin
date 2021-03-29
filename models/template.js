const mongoose = require("mongoose");
const Field = require("./field");
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
    owner: String,
    fields: [{ type: Schema.Types.ObjectId, ref: "Field" }],
    attachments: [
        {
            url: String,
            filename: String,
        },
    ],
});

module.exports = mongoose.model("Template", TemplateSchema);

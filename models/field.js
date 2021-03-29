const mongoose = require("mongoose");
const FieldType = require("./fieldType");
const Schema = mongoose.Schema;

const FieldSchema = new Schema({
    fieldtype: { type: Schema.Types.ObjectId, ref: "FieldType" },
    owner: String,
    value: String,
});

module.exports = mongoose.model("Field", FieldSchema);

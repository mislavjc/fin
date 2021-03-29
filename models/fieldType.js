const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FieldTypeSchema = new Schema({
    name: String,
    type: String,
    color: String,
    additional: Schema.Types.Mixed,
    owner: String,
});

module.exports = mongoose.model("FieldType", FieldTypeSchema, "fieldtypes");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CreateFormSchema = new Schema({
    owner: String,
    kategorija: Array,
    kategorijaTip: Array,
    kategorijaBoja: Array,
    kategorijaDropDown: Array,
    kategorijaDD: Array,
});

module.exports = mongoose.model("CreateForm", CreateFormSchema);

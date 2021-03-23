const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    kategorija: Array,
});

module.exports = mongoose.model("Form", FormSchema);
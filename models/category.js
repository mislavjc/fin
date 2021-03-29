const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: String,
    type: String,
    color: String,
    additional: Array,
    owner: String,
    order: String,
})

module.exports = mongoose.model("Category", CategorySchema);
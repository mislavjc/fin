const mongoose = require("mongoose");
const Template = require("./template");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    owner: String,
    template: [{ type: Schema.Types.ObjectId, ref: "Template" }],
});

module.exports = mongoose.model("Order", OrderSchema);

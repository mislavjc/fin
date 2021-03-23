const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    kategorija1: String,
    kategorija2: String,
    kategorija3: String,
    kategorija4: String,
    kategorija5: String,
    kategorija6: String,
    kategorija7: String,
    kategorija8: String,
    kategorija9: String,
    kategorija10: String,
    kategorija11: String,
    kategorija12: String,
    kategorija13: String,
    kategorija14: String,
    kategorija15: String,
    kategorija16: String,
    kategorija17: String,
    kategorija18: String,
    kategorija19: String,
    kategorija20: String,
});

module.exports = mongoose.model("Form", FormSchema);
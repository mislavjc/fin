const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    kategorija1: Array,
    kategorija2: Array,
    kategorija3: Array,
    kategorija4: Array,
    Kategorija5: Array,
    kategorija6: Array,
    kategorija7: Array,
    kategorija8: Array,
    kategorija9: Array,
    kategorija10: Array,
    kategorija11: Array,
    kategorija12: Array,
    kategorija13: Array,
    kategorija14: Array,
    kategorija15: Array,
    kategorija16: Array,
    kategorija17: Array,
    kategorija18: Array,
    kategorija19: Array,
    kategorija20: Array,
});

module.exports = mongoose.model("Form", FormSchema);
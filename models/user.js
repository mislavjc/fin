const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    pretplata: {
        type: String,
        default: "Besplatan",
    },
    theme: {
        type: String,
        default: "light",
    },
    brojKategorija: String,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Manager = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    birth: {
        type: Date,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    address: {
        type: String,
        required: true,
        minlength: 6,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "none"],
        default: "none",
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "manager"],
        default: "manager",
    },
});
module.exports = mongoose.model("Manager", Manager);

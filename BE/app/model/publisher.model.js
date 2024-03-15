const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Publisher = new Schema({
    publisherName: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
        minlength: 6,
        unique: true,
    },
});
module.exports = mongoose.model("Publisher", Publisher);

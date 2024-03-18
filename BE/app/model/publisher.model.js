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
        minlength: 6,
    },
});
module.exports = mongoose.model("Publisher", Publisher);

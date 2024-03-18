const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Book = new Schema({
    title: { type: String, required: true },
    price: { type: Number },
    publisher: { type: String }, //nxb
    publicationDate: { type: Date }, //nam xuat ban
    available: { type: Number }
});
module.exports = mongoose.model("Book", Book);

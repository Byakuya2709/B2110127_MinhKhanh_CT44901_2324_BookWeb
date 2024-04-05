const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookManager = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    returned: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ["Đang Chờ Xác Nhận", "Đang Mượn"],
        default: "Đang Chờ Xác Nhận",
    }
});
module.exports = mongoose.model("BookManager", BookManager);

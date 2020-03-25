// Hayley code
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    _id : Schema.Types.ObjectId,
    portfolioID: {
        type: Schema.Types.ObjectId,
        ref: 'Portfolio'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    },
    posted: Date,
    text: String
});
module.exports = mongoose.model('Comment', commentSchema);
// Hayley code ends
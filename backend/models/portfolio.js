// YANAS code
const mongoose = require('mongoose');
const portfolioSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    title : String,
    description : String,
    image : String,
    category : String,
    price : Number,
    memberId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Member'
    }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
// YANAS code ends

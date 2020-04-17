// YANAS code
const mongoose = require('mongoose'); 

const memberSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  username : String,
  email : String,
  password : String,
  about : String,
  location :String,
  website : String

});
module.exports = mongoose.model('Member', memberSchema);
// YANAS code ends

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipSchema = new Schema({
  _creator: {type: Schema.Types.ObjectId, ref:"User"},
  _trip: {type: Schema.Types.ObjectId, ref:"Trip"},
  category: {enum: ['food & drinks', 'activities', 'where to stay']},
  description: String,
  title: {type: String, required: true},
  location: String,
  isDone: {type: Boolean, default: false}
})

const Tip = mongoose.model('Tip', tipSchema);
module.exports = Tip;

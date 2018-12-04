const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  _creator: {type: Schema.Types.ObjectId, ref:"User"},
  destination: {type: String, required: true},
  isOver: {type: Boolean, default: 'false'},
  pictureUrl: String
})

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;

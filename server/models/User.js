const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    unique: true,
    match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  },
  password: String,
  pictureUrl: String,
  _trip: {type: Schema.Types.ObjectId, ref:"Trip"},
  _friends: [{
    _friendsId: {type: Schema.Types.ObjectId, ref:"User"},
    status: {enum: ['pending', 'accepted'], default: 'pending'}
  }]
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;

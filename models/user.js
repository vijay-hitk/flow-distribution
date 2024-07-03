const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  connectedAstrologer: { type: mongoose.Schema.Types.ObjectId, ref: 'Astrologer' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

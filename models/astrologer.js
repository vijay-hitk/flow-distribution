const mongoose = require('mongoose');

const astrologerSchema = new mongoose.Schema({
  name: String,
  connections: { type: Number, default: 0 },
  topAstrologer: { type: Boolean, default: false },
  flowMultiplier: { type: Number, default: 1 }
});

const Astrologer = mongoose.model('Astrologer', astrologerSchema);

module.exports = Astrologer;

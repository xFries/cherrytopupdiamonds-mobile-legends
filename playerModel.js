const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerId: { type: String, required: true, unique: true }, // Mobile Legends Player ID
  region: { type: String, required: true }, // Region (e.g., "SEA", "NA", etc.)
  username: { type: String, required: true, unique: true },
  accountName: { type: String, required: true }, // Account name to be retrieved
  rank: { type: String, required: true },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;

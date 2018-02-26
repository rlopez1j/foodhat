const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create history model for previous "hat" sessions (check syntax)
const historySchema = new Schema({
  restaurantName: String,
  restaurantAddress: String,
  usersInvolved: [String],
  date: Date
});

const History = mongoose.model('history', historySchema);
module.export = History;

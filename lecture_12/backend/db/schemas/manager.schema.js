const { Schema } = require('mongoose');

exports.ManagerSchema = new Schema({
  name: String,
  surname: String,
  experience: Number,
  salary: Number,
  state: String,
  developers: Array,
  quotient: Number
});
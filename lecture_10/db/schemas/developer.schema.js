const { Schema } = require('mongoose');

exports.DeveloperSchema = new Schema({
  name: String,
  surname: String,
  experience: Number,
  lines: Number,
  state: String,
  salary: Number
});
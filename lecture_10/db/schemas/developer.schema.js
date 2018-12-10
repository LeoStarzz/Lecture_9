const { Schema } = require('mongoose');

exports.DeveloperSchema = new Schema({
  name: String,
  surname: String,
  experiance: Number,
  lines: Number,
  state: String,
  salary: Number
});
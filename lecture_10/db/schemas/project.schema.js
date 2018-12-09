const {Schema} = require('mongoose');

exports.ProjectSchema = new Schema({
    name: String,
    cost: Number,
    linesOfCode: Number,
    manager: Object,
    remainsLinesOfCode: Number
});
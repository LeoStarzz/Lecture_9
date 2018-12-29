const mongoose = require('mongoose');
const { DeveloperSchema } = require('../schemas/developer.schema');

exports.DeveloperModel = mongoose.model('Developer', DeveloperSchema);
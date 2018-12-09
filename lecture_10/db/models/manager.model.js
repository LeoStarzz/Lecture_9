const mongoose = require('mongoose');
const { ManagerSchema } = require('../schemas/manager.schema');

exports.ManagerModel = mongoose.model('Company', ManagerSchema);
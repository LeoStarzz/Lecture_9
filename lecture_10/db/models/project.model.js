const mongoose = require('mongoose');
const { ProjectSchema } = require('../schemas/project.schema');

exports.ProjectModel = mongoose.model('Company', ProjectSchema);
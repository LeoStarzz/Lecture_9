const mongoose = require('mongoose');
const { CompanySchema } = require('../schemas/company.schema');

exports.CompanyModel = mongoose.model('Company', CompanySchema);


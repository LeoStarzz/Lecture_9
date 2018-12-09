const { CompanyModel } = require('../db/models/company.model');

class CompanyRepository {
  async getOne(id) {
    return await CompanyModel.findOne(id);
  }

  async getAll() {
    return await CompanyModel.find();
  }

  async createOne(company) {
    return await CompanyModel.create(company);
  }

  async deleteOne(_id) {
    return await CompanyModel.deleteOne({ _id });
  }
}

exports.CompanyRepository = new CompanyRepository();
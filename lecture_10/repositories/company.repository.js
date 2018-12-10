const { CompanyModel } = require('../db/models/company.model');

class CompanyRepository {
  async getOne(id) {
    const company = await CompanyModel.findbyId(id);
    return company;
  }

  async getAll() {
    const companies = await CompanyModel.find();
    return companies;
  }

  async createOne(company) {
    const newCompany = await new CompanyModel(company).save();
    console.log(newCompany);
    return newCompany;
  }

  async deleteOne(id) {
    const company = await CompanyModel.findByIdAndRemove(id);
    return company;
  }

  async updateOne(id, company) {
    const newCompany = await CompanyModel.findByIdAndUpdate(id, company, { new: true });
    return newCompany;
  }

  async deleteAll() {
    const companies = await CompanyModel.deleteMany();
    return companies;
  }
}

exports.CompanyRepository = new CompanyRepository();
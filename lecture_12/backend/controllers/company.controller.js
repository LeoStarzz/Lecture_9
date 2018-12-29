const { CompanyRepository } = require('../repositories/company.repository');

class CompanyController {
  async findOne(id) {
    const company = await CompanyRepository.getOne(id);
    return company;
  }

  async findAll() {
    const companies = await CompanyRepository.getAll();
    return companies;
  }

  async create(company) {
    const newCompany = await CompanyRepository.createOne(company);
    return newCompany;
  }

  async updateOne(id, company) {
    const newCompany = await CompanyRepository.updateOne(id, company);
    return newCompany;
  }

  async deleteOne(id) {
    const company = await CompanyRepository.deleteOne(id);
    return company;
  }

  async deleteAll() {
    const companies = await CompanyRepository.deleteAll();
    return companies;
  }
}

exports.CompanyController = new CompanyController();
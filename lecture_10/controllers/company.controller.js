const { CompanyRepository } = require('../repositories/company.repository');

class companyController {
  async findOne(id) {
    return await CompanyRepository.getOne(id);
  }

  async findAll() {
    return await CompanyRepository.getAll();
  }

  async create(company) {
    return await CompanyRepository.createOne(company);
  }

  async updateOne(id, { name }) {

  }

  async deleteOne(id) {
    return await CompanyRepository.deleteOne(id);
  }

  async deleteAll() {

  }
}

exports.companyController = new companyController();
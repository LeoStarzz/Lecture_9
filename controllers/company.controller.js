let { companies } = require('../data/companies.data');
const { Company } = require('../models/Company');

class companyController {
  findOne(id) {
    return companies.find(({ id: comId }) => comId === id);
  }

  findAll() {
    return companies;
  }

  create(name) {
    const company = new Company(name);

    companies.push(company);
    return company.id;
  }

  updateOne(id, name) {
    const company = this.findOne(id);
    
    company.name = name || company.name;
  }

  deleteOne(id) {
    const index = companies.findIndex(c => c.id === id);
    companies.splice(index, 1);
  }

  deleteAll() {
    companies = [];
  }
}

exports.companyController = new companyController();
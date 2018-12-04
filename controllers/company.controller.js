const { companies } = require('../data/companies.data');
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

  updateOne(id, data) {
    const index = companies.findIndex(c => c.id === id);
    companies[index] = data;
  }

  deleteOne(id) {
    const index = companies.findIndex(c => c.id === id);
    companies.splice(index, 1);
  }
}

exports.companyController = new companyController();
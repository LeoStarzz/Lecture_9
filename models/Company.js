let id = 0;

class Company {
  constructor(name) {
    this.id = id;
    this.name = name;
    id++;
  }
}

exports.Company = Company;


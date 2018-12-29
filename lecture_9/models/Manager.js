let id = 0;

class Manager {
  constructor(name, surname, experience = 1) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.experience = experience;
    this.salary = this.getSalary();
    this.state;
    this.developers = [];
    this.quotient = this.getQuotient();
    id += 1;
  }
  getSalary() {
    if (this.experience < 0) {
      alert('Опыт должен быть больше 0 лет');
    }
    else if (this.experience < 2) {
      return 400;
    }
    else if (this.experience < 5) {
      return 600;
    }
    else {
      return 1000;
    }
  }
  getQuotient() {
    if (this.experience < 0) {
      alert('Опыт должен быть больше 0 лет');
    }
    else if (this.experience < 2) {
      return 1.2;
    }
    else if (this.experience < 5) {
      return 1.5;
    }
    else {
      return 2.5;
    }
  }
}


exports.Manager = Manager;
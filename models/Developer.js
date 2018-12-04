const u = require("../Utils");
const utils = new u.Utils();
let id = 0;

class Developer {
  constructor(name, surname, experience = 1, mode) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.experience = experience;
    this.lines = this.getLines(mode);
    this.state;
    this.salary = this.getSalary();
    id++;
  }
  getSalary() {
    if (this.experience < 2) {
      return 300;
    }
    else if (this.experience < 5) {
      return 600;
    }
    else {
      return 1000;
    }
  }
  getLines(mode) {
    if (mode === 'easy') {
      if (this.experience < 0) {
        alert('Опыт должен быть больше 0 лет');
      }
      else if (this.experience < 2) {
        this.lines = utils.getRandomInRange(400, 600);
        return this.lines;
      }
      else if (this.experience < 5) {
        this.lines = utils.getRandomInRange(700, 900);
        return this.lines;
      }
      else {
        this.lines = utils.getRandomInRange(1000, 1400);
        return this.lines;
      }
    }
    else if (mode === 'medium') {
      if (this.experience < 0) {
        alert('Опыт должен быть больше 0 лет');
      }
      else if (this.experience < 2) {
        this.lines = utils.getRandomInRange(300, 500);
        return this.lines;
      }
      else if (this.experience < 5) {
        this.lines = utils.getRandomInRange(600, 800);
        return this.lines;
      }
      else {
        this.lines = utils.getRandomInRange(800, 1200);
        return this.lines;
      }
    }
    else if (mode === 'hard') {
      if (this.experience < 0) {
        alert('Опыт должен быть больше 0 лет');
      }
      else if (this.experience < 2) {
        this.lines = utils.getRandomInRange(200, 400);
        return this.lines;
      }
      else if (this.experience < 5) {
        this.lines = utils.getRandomInRange(500, 700);
        return this.lines;
      }
      else {
        this.lines = utils.getRandomInRange(800, 1000);
        return this.lines;
      }
    }
  }
}

exports.Developer = Developer;
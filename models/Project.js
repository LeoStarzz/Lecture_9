const utils = require("../public/utils");
let id = 0;

class Project {
  constructor(name = 'New project') {
    this.id = id;
    this.name = name;
    this.cost;
    this.linesOfCode;
    this.manager;
    this.remainsLinesOfCode;
    id++;
  }
  getCost(mode) {
    if (mode === 'easy') {
      this.cost = utils.getRandomInRange(30000, 100000);
      return this.cost;
    }
    else if (mode === 'medium') {
      this.cost = utils.getRandomInRange(15000, 60000);
      return this.cost;
    }
    else if (mode === 'hard') {
      this.cost = utils.getRandomInRange(10000, 40000);
      return this.cost;
    }
  }
  getLinesOfCode(mode) {
    if (mode === 'easy') {
      this.linesOfCode = utils.getRandomInRange(4000, 8000);
      this.remainsLinesOfCode = this.linesOfCode;
      return this.linesOfCode;
    }
    else if (mode === 'medium') {
      this.linesOfCode = utils.getRandomInRange(6000, 12000);
      this.remainsLinesOfCode = this.linesOfCode;
      return this.linesOfCode;
    }
    else if (mode === 'hard') {
      this.linesOfCode = utils.getRandomInRange(10000, 20000);
      this.remainsLinesOfCode = this.linesOfCode;
      return this.linesOfCode;
    }
  }
}

exports.Project = Project;


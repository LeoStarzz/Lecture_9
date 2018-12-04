const { managers } = require('../data/managers.data');
const { Manager } = require('../models/manager');

class managerController {
  findOne(id) {
    return managers.find(({ id: manId }) => manId === id);
  }

  findAll() {
    return managers;
  }

  create(name, surname, experience) {
    const manager = new Manager(name, surname, experience);

    managers.push(manager);
    return manager.id;
  }

  updateOne(id, data) {
    const index = managers.findIndex(c => c.id === id);
    managers[index] = data;
  }

  deleteOne(id) {
    const index = managers.findIndex(c => c.id === id);
    managers.splice(index, 1);
  }
}

exports.managerController = new managerController();
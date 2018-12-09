let { managers } = require('../data/managers.data');
const { Manager } = require('../models/manager');

class managerController {
  findOne(id) {
    return managers.find(({id: mId}) => mId === +id);
  }

  findAll() {
    return managers;
  }

  create(name, surname, experience) {
    const manager = new Manager(name, surname, experience);

    managers.push(manager);
    return manager;
  }

  updateOne(id, {name, surname, experience}) {
    const manager = this.findOne(id);
    
    manager.name = name || manager.name;
    manager.surname = surname || manager.surname;
    manager.experience = experience || manager.experience;
    return manager;
  }

  deleteOne(id) {
    const index = managers.findIndex(c => c.id === id);
    managers.splice(index, 1);
  }

  deleteAll() {
    managers = [];
  }
}

exports.managerController = new managerController();
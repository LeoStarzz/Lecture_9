const { developers } = require('../data/developers.data');
const { Developer } = require('../models/Developer');

class developerController {
  findOne(id) {
    return developers.find(({ id: devId }) => devId === id);
  }

  findAll() {
    return developers;
  }

  create(name, surname, experience) {
    const developer = new Developer(name, surname, experience);

    developers.push(developer);
  }

  updateOne(id, data) {
    const index = developers.findIndex(c => c.id === id);
    developers[index] = data;
  }

  deleteOne(id) {
    const index = developers.findIndex(c => c.id === id);
    developers.splice(index, 1);
  }
}

exports.developerController = new developerController();
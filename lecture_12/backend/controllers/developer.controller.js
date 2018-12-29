const { DeveloperRepository } = require('../repositories/developer.repository');

class DeveloperController {
  async findOne(id) {
    const developer = await DeveloperRepository.getOne(id);
    return developer;
  }

  async findAll() {
    const developers = await DeveloperRepository.getAll();
    return developers;
  }

  async create(developer) {
    const newDeveloper = await DeveloperRepository.createOne(developer);
    return newDeveloper;
  }

  async updateOne(id, developer) {
    const newDeveloper = await DeveloperRepository.updateOne(id, developer);
    return newDeveloper;
  }

  async deleteOne(id) {
    const developer = await DeveloperRepository.deleteOne(id);
    return developer;
  }

  async deleteAll() {
    const developers = await DeveloperRepository.deleteAll();
    return developers;
  }
}

exports.DeveloperController = new DeveloperController();
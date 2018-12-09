const { DeveloperRepository } = require('../repositories/developer.repository');

class DeveloperController {
  async findOne(id) {
    return await DeveloperRepository.getOne(id);
  }

  async findAll() {
    return await DeveloperRepository.getAll();
  }

  async create(developer) {
    return await DeveloperRepository.createOne(developer);
  }

  async updateOne(id, { name }) {

  }

  async deleteOne(id) {
    return await DeveloperRepository.deleteOne(id);
  }

  async deleteAll() {

  }
}

exports.DeveloperController = new DeveloperController();
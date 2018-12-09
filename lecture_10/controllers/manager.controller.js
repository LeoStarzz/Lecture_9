const { ManagerRepository } = require('../repositories/manager.repository');

class ManagerController {
  async findOne(id) {
    return await ManagerRepository.getOne(id);
  }

  async findAll() {
    return await ManagerRepository.getAll();
  }

  async create(manager) {
    return await ManagerRepository.createOne(manager);
  }

  async updateOne(id, { name }) {

  }

  async deleteOne(id) {
    return await ManagerRepository.deleteOne(id);
  }

  async deleteAll() {

  }
}

exports.ManagerController = new ManagerController();
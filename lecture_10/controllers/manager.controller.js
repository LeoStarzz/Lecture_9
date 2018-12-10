const { ManagerRepository } = require('../repositories/manager.repository');

class ManagerController {
  async findOne(id) {
    const manager = await ManagerRepository.getOne(id);
    return manager;
  }

  async findAll() {
    const managers = await ManagerRepository.getAll();
    return managers;
  }

  async create(manager) {
    const newManager = await ManagerRepository.createOne(manager);
    return newManager;
  }

  async updateOne(id, manager) {
    const newManager = await ManagerRepository.updateOne(id, manager);
    return newManager;
  }

  async deleteOne(id) {
    const manager = await ManagerRepository.deleteOne(id);
    return manager;
  }

  async deleteAll() {
    const managers = await ManagerRepository.deleteAll();
    return managers;
  }
}

exports.ManagerController = new ManagerController();
const { ManagerModel } = require('../db/models/manager.model');

class ManagerRepository {
  async getOne(id) {
    const manager = await ManagerModel.findbyId(id);
    return manager;
  }

  async getAll() {
    const managers = await ManagerModel.find();
    return managers;
  }

  async createOne(manager) {
    const newManager = await new ManagerModel(manager).save();
    return newManager;
  }

  async deleteOne(id) {
    const manager = await ManagerModel.findByIdAndRemove(id);
    return manager;
  }

  async updateOne(id, manager) {
    const newManager = await ManagerModel.findByIdAndUpdate(id, manager, { new: true });
    return newManager;
  }

  async deleteAll() {
    const managers = await ManagerModel.deleteMany();
    return managers;
  }
}

exports.ManagerRepository = new ManagerRepository();
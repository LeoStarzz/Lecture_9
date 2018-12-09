const { ManagerModel } = require('../db/models/manager.model');

class ManagerRepository {
  async getOne(id) {
    return await ManagerModel.findOne(id);
  }

  async getAll() {
    return await ManagerModel.find();
  }

  async createOne(manager) {
    return await ManagerModel.create(manager);
  }

  async deleteOne(_id) {
    return await ManagerModel.deleteOne({ _id });
  }
}

exports.ManagerRepository = new ManagerRepository();
const { DeveloperModel } = require('../db/models/developer.model');

class DeveloperRepository {
  async getOne(id) {
    return await DeveloperModel.findOne(id);
  }

  async getAll() {
    return await DeveloperModel.find();
  }

  async createOne(company) {
    return await DeveloperModel.create(company);
  }

  async deleteOne(_id) {
    return await DeveloperModel.deleteOne({ _id });
  }
}

exports.DeveloperRepository = new DeveloperRepository();
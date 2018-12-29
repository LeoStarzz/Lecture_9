const { DeveloperModel } = require('../db/models/developer.model');

class DeveloperRepository {
  async getOne(id) {
    const developer = await DeveloperModel.findbyId(id);
    return developer;
  }

  async getAll() {
    const developers = await DeveloperModel.find();
    return developers;
  }

  async createOne(developer) {
    const newDeveloper = await new DeveloperModel(developer).save();
    return newDeveloper;
  }

  async deleteOne(id) {
    const developer = await DeveloperModel.findByIdAndRemove(id);
    return developer;
  }

  async updateOne(id, developer) {
    const newDeveloper = await DeveloperModel.findByIdAndUpdate(id, developer, { new: true });
    return newDeveloper;
  }

  async deleteAll() {
    const developers = await DeveloperModel.deleteMany();
    return developers;
  }
}

exports.DeveloperRepository = new DeveloperRepository();
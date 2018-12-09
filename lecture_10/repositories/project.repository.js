const { ProjectModel } = require('../db/models/project.model');

class ProjectRepository {
  async getOne(id) {
    return await ProjectModel.findOne(id);
  }
  
  async getAll() {
    return await ProjectModel.find();
  }

  async createOne(project) {
    return await ProjectModel.create(project);
  }

  async deleteOne(_id) {
    return await ProjectModel.deleteOne({ _id });
  }
}

exports.ProjectRepository = new ProjectRepository();
const { ProjectRepository } = require('../repositories/project.repository');

class ProjectController {
  async findOne(id) {
    return await ProjectRepository.getOne(id);
  }

  async findAll() {
    return await ProjectRepository.getAll();
  }

  async create(project) {
    return await ProjectRepository.createOne(project);
  }

  async updateOne(id, { name }) {

  }

  async deleteOne(id) {
    return await ProjectRepository.deleteOne(id);
  }

  async deleteAll() {

  }
}

exports.ProjectController = new ProjectController();
const { ProjectRepository } = require('../repositories/project.repository');

class ProjectController {
  async findOne(id) {
    const project = await ProjectRepository.getOne(id);
    return project;
  }

  async findAll() {
    const projects = await ProjectRepository.getAll();
    return projects;
  }

  async create(project) {
    const newProject = await ProjectRepository.createOne(project);
    return newProject;
  }

  async updateOne(id, project) {
    const newProject = await ProjectRepository.updateOne(id, project);
    return newProject;
  }

  async deleteOne(id) {
    const project = await ProjectRepository.deleteOne(id);
    return project;
  }

  async deleteAll() {
    const projects = await ProjectRepository.deleteAll();
    return projects;
  }
}

exports.ProjectController = new ProjectController();
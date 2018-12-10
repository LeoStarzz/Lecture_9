const { ProjectModel } = require('../db/models/project.model');

class ProjectRepository {
  async getOne(id) {
    const project = await ProjectModel.findbyId(id);
    return project;
  }

  async getAll() {
    const projects = await ProjectModel.find();
    return projects;
  }

  async createOne(project) {
    const newProject = await new ProjectModel(project).save();
    return newProject;
  }

  async deleteOne(id) {
    const project = await ProjectModel.findByIdAndRemove(id);
    return project;
  }

  async updateOne(id, project) {
    const newProject = await ProjectModel.findByIdAndUpdate(id, project, { new: true });
    return newProject;
  }

  async deleteAll() {
    const projects = await ProjectModel.deleteMany();
    return projects;
  }
}

exports.ProjectRepository = new ProjectRepository();
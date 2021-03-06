let { projects } = require('../data/projects.data');
const { Project } = require('../models/project');

class projectController {
  findOne(id) {
    return projects.find(({id: pId}) => pId === +id);
  }

  findAll() {
    return projects;
  }

  create(name, mode) {
    const project = new Project(name, mode);
    
    projects.push(project);
    return project;
  }

  updateOne(id, {name}) {
    const project = this.findOne(id);

    project.name = name || project.name;
    return project;
  }

  deleteOne(id) {
    const index = projects.findIndex(p => p.id === id);
    projects.splice(index, 1);
  }

  deleteAll() {
    projects = [];
  }
}

exports.projectController = new projectController();
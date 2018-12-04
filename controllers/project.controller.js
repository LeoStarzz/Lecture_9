const { projects } = require('../data/projects.data');
const { Project } = require('../models/project');

class projectController {
  findOne(id) {
    return projects.find(({ id: projId }) => projId === id);
  }

  findAll() {
    return projects;
  }

  create(name, mode) {
    const project = new Project(name, mode);
    
    projects.push(project);
    return project.id;
  }

  updateOne(id, data) {
    const index = projects.findIndex(c => c.id === id);
    projects[index] = data;
  }

  deleteOne(id) {
    const index = projects.findIndex(p => p.id === id);
    projects.splice(index, 1);
  }
}

exports.projectController = new projectController();
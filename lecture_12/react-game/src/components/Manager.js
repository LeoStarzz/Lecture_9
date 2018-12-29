import React, { Component } from "react";

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {}
    }
  }

  handleBtnFire = async () => {
    const { projects, manager, updateProject, removeManager } = this.props;
    if (manager.state !== 'free' ) {
      const project = projects.find((project) => project._id === manager.state);
      project.manager = 'free';
      await updateProject(project);
      await removeManager(manager._id);
    } else {
      await removeManager(manager._id);
    }
  }

  getFreeProjects = () => {
    const { projects } = this.props;
    const freeProjects = projects.filter((project) => project.manager === 'free');

    return freeProjects.map((project) => {
      return (
        <option key={project._id} value={project._id}>{project.name}</option>
      )
    });
  }

  getProject = async () => {
    const { manager, updateManager, projects } = this.props;
    const projectId = document.getElementById('select').selectedOptions[0].value;
    const project = projects.find((p) => p._id === projectId);
    
    manager.state = project;
    await updateManager(manager);
  }

  render() {
    const { name, surname, experience, salary, state, quotient } = this.props.manager;
    const { updateManager } = this.props;

    const project = this.props.projects.find((project) => project._id === state);
    if (project === undefined) {
      this.props.manager.state = 'free';
      this.props.manager.developers = [];
      updateManager(this.props.manager);
    }

    return (
      <div className="manager">
        Name: {name},
        Surname: {surname},
        Experience: {experience},
        Salary: {salary}$,
        Project: {project.name || 'free'},
        Experience: {experience},
        Quotient: {quotient}
        Change project:
        <select id="select" onChange={this.getProject}>{this.getFreeProjects()}</select>
        <hr />
        <button className="fire-button" onClick={this.handleBtnFire}>
          Fire
        </button>
      </div>
    );
  }
}

export default Manager;
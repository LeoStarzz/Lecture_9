import React, { Component } from 'react';

class Developer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {}
    }
  }

  handleBtnFire = async () => {
    const { developer, managers, updateManager, removeDeveloper } = this.props;
    if (developer.state === 'free') {
      await removeDeveloper(developer._id);
    } else {
      const manager = managers.find((manager) => manager.state === developer.state);
      manager.developers.filter((dev) => dev._id !== developer._id);
      await updateManager(manager);
      await removeDeveloper(developer._id);
    }
  }

  getFreeProjects = () => {
    const { managers, projects } = this.props;
    const freeManagers = managers.filter((manager) => manager.developers.length < 5);
    
    if (freeManagers !== []) {
      return freeManagers.map((manager) => {
        const projectName = projects.find((project) => manager.state === project._id).name;
        return (
        <option key={manager.state} value={manager.state}>{projectName}</option>
        )
      });
    }
  }

  getProject = async () => {
    if (document.getElementById('select').selectedOptions[0] === undefined) {
      return null;
    } else {
      const projectId = document.getElementById('select').selectedOptions[0].value;
      const project = this.props.projects.find((p) => p._id === projectId);
      this.setState({
        project
      });
    }
  }

  render() {
    const { name, surname, salary, experience, lines, state } = this.props.developer;
    const { updateDeveloper } = this.props;

    const project = this.props.projects.find((project) => project._id === state);
    if (project === undefined) {
      this.props.developer.state = 'free';
      updateDeveloper(this.props.developer);
    }

    return (
      <div className="developer">
        Name: {name},
        Surname: {surname},
        Salary: {salary}$,
        Experience: {experience},
        Lines: {lines},
        Project: {project.name || 'free'}
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

export default Developer;


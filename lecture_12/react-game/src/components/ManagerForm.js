import React, { Component } from 'react';
import { Fragment } from 'react';

import Utils from '../utils/utils';
import '../styles/ManagerForm.css';

class ManagerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      experience: 1,
      project: {}
    }
    this.utils = new Utils();
  }

  handleInputName = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  handleInputSurname = (e) => {
    this.setState({
      surname: e.target.value
    });
  }

  handleInputExperience = (e) => {
    this.setState({
      experience: e.target.value
    });
  }

  handleClick = async () => {
    const { mode, isOn, projects, addManager, updateProject, error } = this.props;
    if (!isOn || mode === undefined) {
      error('You need to choose mode and start game!');
    } else {
      if (await this.getProject() === null) {
        this.props.error('There are no free projects!');
      } else {
        const manager = {
          name: this.state.name,
          surname: this.state.surname,
          experience: this.state.experience,
          salary: this.utils.getManagerSalary(this.state.experience),
          state: this.state.project._id,
          developers: [],
          quotient: this.utils.getQuotient(this.state.experience)
        }
        await addManager(manager);
        const project = projects.find((project) => project._id === manager.state);
        project.manager = manager;
        await updateProject(project);
      }
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
    return (
      <Fragment>
        <div className="manager-form">
          <p className="header">MANAGERS</p>
          <div>
            <label className="manager-name-label">Manager name: </label>
            <input className="input manager-name-input" value={this.state.name} onChange={this.handleInputName} /></div>
          <div>
            <label className="manager-surname-label">Manager surname: </label>
            <input className="input manager-surname-input" value={this.state.projectName} onChange={this.handleInputSurname} />
          </div>
          <label className="manager-experience-label">Manager experience: </label>
          <input type="number" className="input manager-experience-input" value={this.state.projectName} onChange={this.handleInputExperience} />
          Project:
          <select id="select" onChange={this.getProject}>
            {this.getFreeProjects()}
          </select>
          <div className="add add-manager" onClick={this.handleClick}>Add manager</div>
        </div>
      </Fragment>
    );
  }
}

export default ManagerForm;
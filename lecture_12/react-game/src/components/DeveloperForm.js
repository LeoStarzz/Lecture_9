import React, { Component } from 'react';
import { Fragment } from 'react'
import '../styles/DeveloperForm.css';
import Utils from '../utils/utils';

class DeveloperForm extends Component {
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
    const { mode, isOn, addDeveloper, error } = this.props;
    if (!isOn || mode === undefined) {
      error('You need to choose mode and start the game!');
    } else {
      if (await this.getProject() === null) {
        this.props.error('You need free manager!');
      } else {
        const developer = {
          name: this.state.name,
          surname: this.state.surname,
          experience: this.state.experience,
          lines: this.utils.getDeveloperLines(mode, this.state.experience),
          state: this.state.project._id,
          salary: this.utils.getDeveloperSalary(this.state.experience)
        }
        await addDeveloper(developer);
        await this.getManager(developer);
      }
    }
  }

  getManager = async (developer) => {
    const { managers, updateManager } = this.props;
    const manager = managers.find((manager) => manager.state === developer.state);
    manager.developers.push(developer);
    await updateManager(manager);
  }

  getFreeProjects = () => {
    const { managers, projects } = this.props;
    const freeManagers = managers.filter((manager) => manager.developers.length < 5);

    if (freeManagers !== []) {
      return freeManagers.map((manager) => {
        const projectName = projects.find((project => project._id === manager.state)).name;
        return (
          <option key={manager.state} value={manager.state}>{projectName}</option>
        )
      });
    }
  }

  getProject = async () => {
    if (document.getElementById('select-project').selectedOptions[0] === undefined) {
      return null;
    } else {
      const projectId = document.getElementById('select-project').selectedOptions[0].value;
      const project = this.props.projects.find((p) => p._id === projectId);
      this.setState({
        project
      });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="developer-form">
          <p className="header">DEVELOPERS</p>
          <div>
            <label className="developer-name-label">Developer name: </label>
            <input className="input developer-name-input" value={this.state.name} onChange={this.handleInputName} /></div>
          <div>
            <label className="developer-surname-label">Developer surname: </label>
            <input className="input developer-surname-input" value={this.state.surname} onChange={this.handleInputSurname} />
          </div>
          <label className="developer-experience-label">Developer experience: </label>
          <input type="number" className="input developer-experience-input" value={this.state.experience} onChange={this.handleInputExperience} />
          Project:
          <select id="select-project" onChange={this.getProject}>
            {this.getFreeProjects()}
          </select>
          <div className="add add-developer" onClick={this.handleClick}>Add developer</div>
        </div>
      </Fragment>
    );
  }
}

export default DeveloperForm;
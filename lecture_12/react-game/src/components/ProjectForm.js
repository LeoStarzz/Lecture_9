import React, { Component } from 'react';
import { Fragment } from 'react';

import Utils from '../utils/utils';
import '../styles/ProjectForm.css';

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.utils = new Utils();
  }

  handleProjectInput = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  handleClick = async () => {
    const { mode, isOn, error } = this.props;
    if (!isOn || mode === undefined) {
      error('You need to choose mode and start the game!');
    } else {
      if (this.state.name === '') {
        error('You need to choose project name!');
      } else {
        const linesOfCode = this.utils.getLinesOfCode(mode);

        await this.props.addProject({
          name: this.state.name,
          cost: this.utils.getCost(mode),
          linesOfCode: linesOfCode,
          manager: 'free',
          remainsLinesOfCode: linesOfCode
        });
      }
    }

  }

  render() {
    return (
      <Fragment>
        <div className="project-form">
          <p className="header">PROJECTS</p>
          <div>
            <label className="project-name-label">Project name: </label>
            <input className="input project-name-input" value={this.state.name} onChange={this.handleProjectInput} />
          </div>
          <div className="add add-project" onClick={this.handleClick}>Add project</div>
        </div>
      </Fragment>
    );
  }
}

export default ProjectForm;
import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';

import ManagerForm from '../components/ManagerForm';
import ManagersList from '../components/ManagersList';
import { addManager, removeManager } from '../actions/managerActions';
import { error } from '../actions/companyActions';
import { updateProject } from '../actions/projectActions';
import { updateManager } from '../actions/managerActions';


class Managers extends Component {
  render() {
    const { managers, addManager, removeManager, updateManager, projects, isOn, error, mode, updateProject, developers } = this.props;
    return (
      <Fragment>
        <div className="manager-container">
          <ManagerForm addManager={addManager} projects={projects} updateProject={updateProject} managers={managers} updateManager={updateManager} developers={developers} mode={mode} isOn={isOn} error={error} />
          <ManagersList managers={managers} removeManager={removeManager} projects={projects} updateManager={updateManager} updateProject={updateProject}/>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  isOn: store.company.isOn,
  mode: store.company.mode,
  managers: store.managers.managers,
  projects: store.projects.projects,
  developers: store.developers.developers
});

const mapDispatchToProps = dispatch => ({
  error: (message) => dispatch(error(message)),
  addManager: (manager) => dispatch(addManager(manager)),
  removeManager: (id) => dispatch(removeManager(id)),
  updateManager: (manager) => dispatch(updateManager(manager)),
  updateProject: (project) => dispatch(updateProject(project)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Managers);
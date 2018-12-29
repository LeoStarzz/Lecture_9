import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';

import DeveloperForm from '../components/DeveloperForm';
import DevelopersList from '../components/DevelopersList';
import { addDeveloper, removeDeveloper, updateDeveloper } from '../actions/developerActions';
import { error } from '../actions/companyActions';
import { updateManager } from '../actions/managerActions';

class Developers extends Component {
  render() {
    const { projects, managers, updateManager, developers, addDeveloper, removeDeveloper, updateDeveloper, mode, error, isOn } = this.props;
    return (
      <Fragment>
        <div className="developer-container">
          <DeveloperForm projects={projects} managers={managers} updateManager={updateManager} addDeveloper={addDeveloper} mode={mode} isOn={isOn} error={error}/>
          <DevelopersList projects={projects} developers={developers} removeDeveloper={removeDeveloper} updateDeveloper={updateDeveloper} managers={managers} updateManager={updateManager} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  isOn: store.company.isOn,
  developers: store.developers.developers,
  projects: store.projects.projects,
  managers: store.managers.managers,
  mode: store.company.mode
});

const mapDispatchToProps = dispatch => ({
  error: (message) => dispatch(error(message)),
  addDeveloper: (developer) => dispatch(addDeveloper(developer)),
  updateDeveloper: (developer) => dispatch(updateDeveloper(developer)),
  removeDeveloper: (id) => dispatch(removeDeveloper(id)),
  updateManager: (id) => dispatch(updateManager(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Developers);
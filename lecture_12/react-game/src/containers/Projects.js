import React, { Component } from 'react';
import { Fragment } from 'react'
import { connect } from 'react-redux';

import ProjectForm from '../components/ProjectForm';
import ProjectsList from '../components/ProjectsList';
import Project from '../components/Project';
import { addProject, removeProject  } from '../actions/projectActions';
import { projectCompleted, error } from '../actions/companyActions';

class Projects extends Component {
  render() {
    const { projects, addProject, removeProject, mode, managers, isOn, error } = this.props;
    return (
      <Fragment>
        <div className="project-container">
        <ProjectForm addProject={addProject} mode={mode} managers={managers} isOn={isOn} error={error}/>
        <ProjectsList projects={projects} projectCompleted={projectCompleted}>
          <Project removeProject={removeProject}/>
        </ProjectsList>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  isOn: store.company.isOn,
  projects: store.projects.projects,
  mode: store.company.mode,
  managers: store.managers.managers
});

const mapDispatchToProps = dispatch => ({
  error: (message) => dispatch(error(message)),
  addProject: (project) => dispatch(addProject(project)),
  removeProject: (id) => dispatch(removeProject(id)),
  projectCompleted: (projectId, projectCost) => 
    dispatch(projectCompleted(projectId, projectCost)) 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
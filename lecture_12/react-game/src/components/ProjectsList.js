import React, { Component } from 'react';
import { Fragment } from 'react'

import Project from '../components/Project';
import '../styles/ProjectsList.css';

class ProjectsList extends Component {
   render() {
     const { projects } = this.props;
    return (
      <Fragment>
        <div className="user-data">Your projects:</div>
        <div className="user-projects">
         {projects.map((project, index) => {
           return <Project key={index} project={project}/>
         })}
        </div>
      </Fragment>
    );
  }
}

export default ProjectsList;
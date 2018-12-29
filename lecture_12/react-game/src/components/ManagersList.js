import React, { Component } from 'react';
import { Fragment } from 'react'

import Manager from '../components/Manager';
import '../styles/ManagersList.css';

class ManagersList extends Component {
    render() {
    const { projects, managers, removeManager, updateManager, updateProject } = this.props;
    return (
      <Fragment>
        <div className="user-data">Your managers:</div>
        <div className="user-managers">
          {managers.map((manager, index) => {
            return <Manager key={index} manager={manager} removeManager={removeManager} projects={projects} updateManager={updateManager} updateProject={updateProject}/>
          })}
        </div>
      </Fragment>
    );
  }
}

export default ManagersList;
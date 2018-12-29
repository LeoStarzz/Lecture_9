import React, { Component } from 'react';
import { Fragment } from 'react'

import Developer from '../components/Developer';
import '../styles/DevelopersList.css';

class DevelopersList extends Component {
  render() {
    const { developers, updateDeveloper, removeDeveloper, managers, updateManager, projects } = this.props;
    return (
      <Fragment>
        <div className="user-data">Your developers:</div>
        <div className="user-developers">
          {developers.map((developer, index) => {
            return <Developer key={index} projects={projects} developer={developer} removeDeveloper={removeDeveloper} updateDeveloper={updateDeveloper} managers={managers} updateManager={updateManager}/>
          })}
        </div>
      </Fragment>
    );
  }
}

export default DevelopersList;
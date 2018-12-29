import React, { Component } from 'react';
import { Fragment } from 'react'

import Company from '../containers/Company';
import Developers from '../containers/Developers';
import Managers from '../containers/Managers';
import Projects from '../containers/Projects';
import Statistics from '../containers/Statistics';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Company />
        <Statistics />
        <div className="game-container">
          <Projects className="projects"/>
          <Managers className="managers"/>
          <Developers className="developers"/>
        </div>
      </Fragment>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';

import CompanyForm from '../components/CompanyForm';
import Complexity from '../components/Complexity';
import Controls from '../components/Controls';
import {
  start,
  stop,
  getCompanyName,
  choosedEasy,
  choosedMedium,
  choosedHard,
  tickGame,
  getSalary,
  projectCompleted,
} from '../actions/companyActions';
import { updateProject, removeProject } from '../actions/projectActions';
import { updateManager } from '../actions/managerActions';
import { updateDeveloper } from '../actions/developerActions';

class Company extends Component {
  constructor(props) {
    super(props);
    this.interval = null;
  }

  onBtnStartClickHandler = () => {
    const { start, tick, tickGame, getSalary } = this.props;
    start();
    this.interval = setInterval(() => {
      tickGame();
      const totalSalary = this.totalSalary();
      if (totalSalary !== 0) {
        getSalary(totalSalary);
        this.addLines();
      }
    }, tick);
  }

  onBtnStopClickHandler = () => {
    clearInterval(this.interval);
    this.props.stop();
  }

  totalSalary = () => {
    const { managers, developers } = this.props;
    let total = 0;

    if (managers.length !== 0) {
      total += managers.reduce((totalSalary, manager) => {
        return totalSalary + manager.salary;
      }, 0);
    }

    if (developers.length !== 0) {
      total += developers.reduce((totalSalary, developer) => {
        return totalSalary + developer.salary;
      }, 0);
    }

    return total;
  }

  addLines = async () => {
    const { developers, projects, updateProject, projectCompleted, removeProject } = this.props;

    projects.forEach(async (project) => {
      if (project.manager !== 'free') {
        const projDevelopers = developers.filter(dev => dev.state === project._id);
        const devLines = projDevelopers.reduce((totalLines, developer) => {
          return totalLines + developer.lines;
        }, 0);
        project.remainsLinesOfCode -= Math.floor(devLines * project.manager.quotient);
        if (project.remainsLinesOfCode <= 0) {
          projectCompleted(project.cost);
          await removeProject(project._id);
        }

        await updateProject(project);
      }
    });
  }


  render() {
    const { getCompanyName, choosedEasy, choosedMedium, choosedHard, mode } = this.props;

    return (
      <Fragment>
        <CompanyForm getCompanyName={getCompanyName} />
        <Complexity choosedEasy={choosedEasy} choosedMedium={choosedMedium} choosedHard={choosedHard} mode={mode} />
        <Controls start={this.onBtnStartClickHandler} stop={this.onBtnStopClickHandler} />
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  mode: store.company.mode,
  tick: store.company.tick,
  projects: store.projects.projects,
  managers: store.managers.managers,
  developers: store.developers.developers
});

const mapDispatchToProps = dispatch => ({
  getCompanyName: (name) => dispatch(getCompanyName(name)),
  getSalary: (money) => dispatch(getSalary(money)),
  choosedEasy: () => dispatch(choosedEasy()),
  choosedMedium: () => dispatch(choosedMedium()),
  choosedHard: () => dispatch(choosedHard()),
  start: () => dispatch(start()),
  stop: () => dispatch(stop()),
  tickGame: () => dispatch(tickGame()),
  updateProject: (project) => dispatch(updateProject(project)),
  updateManager: (manager) => dispatch(updateManager(manager)),
  updateDeveloper: (developer) => dispatch(updateDeveloper(developer)),
  projectCompleted: (money) => dispatch(projectCompleted(money)),
  removeProject: (id) => dispatch(removeProject(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);
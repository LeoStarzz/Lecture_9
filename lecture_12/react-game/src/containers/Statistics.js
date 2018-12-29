import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { stop } from '../actions/companyActions';

import '../styles/Statistics.css';

class Statistics extends Component {
  componentDidUpdate() {
    const { budget, stop } = this.props;
    if (budget < 0) {
      alert('Вы проиграли :(');
      stop();
    }
  }

  render() {
    const { time, budget, error, companyName } = this.props;
      
    return (
      <Fragment>
        <p className="time-text">Time:</p>
        <div className="time">{time}</div>
        <p className="budget-text">Your budget: </p>
        <div className="budget">{budget}</div>
        <div className="error">{error}</div>
        <div className="statistics"></div>
        <div className="user-company-name">{companyName}</div>
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  time: store.company.time,
  budget: store.company.budget,
  error: store.company.error,
  companyName: store.company.companyName,
});

const maDispatchToProps = dispatch => ({
  stop: () => dispatch(stop())
});

export default connect(
  mapStateToProps,
  maDispatchToProps
)(Statistics);
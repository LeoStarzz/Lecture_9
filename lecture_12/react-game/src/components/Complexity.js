import React, { Component } from 'react';
import { Fragment } from 'react';

import '../styles/Complexity.css';

class Complexity extends Component {
  handleChoosedEasy = () => {
    this.props.choosedEasy();
  }

  handleChoosedMedium = () => {
    this.props.choosedMedium();
  }

  handleChoosedHard = () => {
    this.props.choosedHard();
  }

  render() {
    return (
      <Fragment>
        <div className="mode" ><span className="mode-text">Choose your mode:</span>
          <div className={this.props.mode === 'easy' ? 'button-active easy' : 'easy'} onClick={this.handleChoosedEasy}>Easy</div>
          <div className={this.props.mode === 'medium' ? 'button-active medium' : 'medium'} onClick={this.handleChoosedMedium}>Medium</div>
          <div className={this.props.mode === 'hard' ? 'button-active hard' : 'hard'} onClick={this.handleChoosedHard}>Hard</div>
        </div>
      </Fragment>
    );
  }
}

export default Complexity;
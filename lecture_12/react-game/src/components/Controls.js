import React, { Component } from 'react';
import { Fragment } from 'react';

import '../styles/Controls.css';

class Controls extends Component {
  render() {
    return (
      <Fragment>
        <div className="start" onClick={this.props.start}>Start</div>
        <div className="stop" onClick={this.props.stop}>Stop</div>
      </Fragment>
    );
  }
}

export default Controls;
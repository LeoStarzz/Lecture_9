import React, { Component } from 'react';

class Project extends Component {
  render() {
    const { name, cost, linesOfCode, manager, remainsLinesOfCode } = this.props.project;

    return (
      <div className="project">
        Name: {name},
        Cost: {cost}$,
        Lines: {linesOfCode},
        Manager: {manager.name || 'free'},
        Left: {remainsLinesOfCode}
        <hr />
      </div>
    );
  }
}

export default Project;

import React, { Component } from 'react';
import { Fragment } from 'react';

import '../styles/CompanyForm.css';

class CompanyForm extends Component {
  eventHandler = (e) => {
    const { getCompanyName } = this.props;
    getCompanyName(e.target.value);
  }

  render() {
    return (
      <Fragment>
        <div className='main-header'>Your IT company!</div>
        <hr></hr>
        <div className="settings">
          <div className="company-name-form">
            <label className="company-name">Company name: </label>
            <input
              className="input company-name-input"
              onChange={this.eventHandler}
              placeholder='Type name' />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CompanyForm;

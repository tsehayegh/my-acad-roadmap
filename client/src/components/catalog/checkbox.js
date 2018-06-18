import React from 'react';
import { withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'

import {SelectionList} from './selectionList';

import './checkbox.css';
class Checkbox extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        isChecked: false,
        listStatus: 'enabled'
      }
    }


  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label, handleButtonStatus} = this.props;
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));
    handleCheckboxChange(label);
    handleButtonStatus();
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;
    return (
        <div className="form-ckeck form-control-lg">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              value={label}
              id={label}
              key={label}
              checked={isChecked}
              onChange={this.toggleCheckboxChange}
            />
            {label}
          </label>
        </div>
    );
  }
}



export default Checkbox;
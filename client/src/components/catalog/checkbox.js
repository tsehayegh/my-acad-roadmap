import React from 'react';

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
              disabled={this.props.checkboxStatus}
            />
            {label}
          </label>
        </div>
    );
  }
}



export default Checkbox;
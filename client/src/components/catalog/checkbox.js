import React from 'react';
import {connect} from 'react-redux';

import './checkbox.css';

export class Checkbox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isChecked: false,
      listStatus: 'enabled',
      selectedCountPerGroup: 0,
      checkboxState: true,
      checkedArray: []
    }
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label} = this.props;
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked
      }
    ));
    handleCheckboxChange(label);
  }

  render() {
    const checker = (this.props.currentSelection.length > this.props.selectionCount);
    const { label } = this.props;
    const { isChecked } = this.state;
    const checkStatus = (this.state.isChecked && checker);

    return (
        <div className="form-ckeck form-control-lg">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              value={label}
              id={label}
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

function mapStateToProps(state, ownProps){

  const toArray = [...ownProps.selectedCheckboxes];

    let groupNumb = '';
    let selectionCount = 0;
    if(toArray.length > 0) {
      groupNumb = toArray.map(curr => curr.split(',')[3])[0];
      selectionCount=toArray.map(curr => curr.split(',')[4])[0];
    }

    
    let selectedFromCurrentGroup =[];
    if(ownProps.plan.length > 1) {
      selectedFromCurrentGroup = ownProps.plan.map(courses => 
                              courses.split(',')).filter(arrayCourse => 
                                Number(arrayCourse[4].trim()) === Number(groupNumb.trim()));
    }

  return {
      currentSelection: toArray,
      groupNumb: groupNumb,
      selectionCount: Number(selectionCount),
      selectedFromCurrentGroup: selectedFromCurrentGroup
    }

};

export default connect(mapStateToProps)(Checkbox);
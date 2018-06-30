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
    const course = label.split(',')[1]; 


    return (
        <div className="form-ckeck form-control-lg">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              value={label}
              id={label.split(',')[1]}
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
    let uniquePlan = [];
    if(ownProps.plan.length > 1) {
      selectedFromCurrentGroup = ownProps.plan.map(courses => 
                              courses.split(',')).filter(arrayCourse => 
                                Number(arrayCourse[4].trim()) === Number(groupNumb.trim()));

      uniquePlan = ownProps.plan.filter(function(elem, pos, arr) {
        return arr.indexOf(elem) === pos;
      });

    }

  return {
      currentSelection: toArray,
      groupNumb: groupNumb,
      selectionCount: Number(selectionCount),
      selectedFromCurrentGroup: selectedFromCurrentGroup,
      uniquePlan: uniquePlan
    }

};

export default connect(mapStateToProps)(Checkbox);
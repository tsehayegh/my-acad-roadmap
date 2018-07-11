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
      checkboxState: true

    }
  }

  componentDidMount(){
    this.props.clearInformation();
  }

  toggleCheckboxChange = (event) => {
    const { handleCheckboxChange, label} = this.props;
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked
      }
    ));
    this.props.clearInformation();

    const maxSelection = Number(label.split(',')[4]);
    const groupNumb = label.split(',')[3];
    const courseName = label.split(',')[1];

    const selectedCheckboxes = [...this.props.selectedCheckboxes];

    const selectedCheckboxesFromGroup = selectedCheckboxes.map(courses =>
                                        courses.split(',')).filter(arrayCourse => 
                                        Number(arrayCourse[3].trim()) === Number(groupNumb.trim()));

    const pPlan = this.props.plan;
    let flatPlan = [].concat.apply([], pPlan);

    const courseNames = [].concat.apply([],flatPlan.map(courses => courses.split(',')[2]));
    const selectedCourseName = courseNames.filter(course => course.trim() === courseName.trim());

    const groups = [].concat.apply([],flatPlan.map(courses => courses.split(',')[4]));
    const groupPlanned = groups.filter(group => Number(group.trim()) === Number(groupNumb.trim()));

    const withinLimit = (groupPlanned.length < maxSelection) && (selectedCourseName.length === 0);
    handleCheckboxChange(label, withinLimit);

  }

  render() {
    const { label } = this.props;
    const courseName = label.split(',')[1]; 
    const pPlan = this.props.plan;
    let flatPlan = [].concat.apply([], pPlan);
    const courseNames = [].concat.apply([],flatPlan.map(courses => courses.split(',')[2]));
    const selectedCourseName = courseNames.filter(course => course.trim() === courseName.trim());
    const strikeOut = selectedCourseName.length > 0 ? 'strikeOut' : "form-check-label";

    return (
        <div className="form-ckeck form-control-lg">
          <label className="form-check-label"
                tabIndex="0"
                onClick={(e) => this.toggleCheckboxChange(e)}
                onKeyPress={(e) => this.toggleCheckboxChange(e)}>
            <input
              className="form-check-input"
              type="checkbox"
              value={label}
              id={courseName}
              name={courseName}
              checked={[...this.props.selectedCheckboxes].indexOf(label) !== -1}
              onChange={(e) => this.toggleCheckboxChange(e)}
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
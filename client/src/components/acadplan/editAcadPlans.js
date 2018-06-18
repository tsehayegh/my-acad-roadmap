

import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {fetchAcadPlans} from '../../actions/catalogActions'

//import AcadPlansList from './acadPlansList';

import requiresLogin from '../auth/requires-login';

import './editAcadPlans.css'
class EditAcadPlans extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			semester: null,
			courseToDelete: null,
			buttonStatus: true,
			plan: []
		}
	}

	setSemester(event){
		this.setState({
		  semester: event
		});
	}

	setCourseToDelete = (event) => {
		this.setState({
		  courseToDelete: event
		});
		this.flattenArray(event);
	}

	handleButtonStatus = () => {
		this.setState({
		    buttonStatus: true
		 }); 
		  if(this.state.semester.trim() !== '' && this.state.courseToDelete.trim() !== '') {
		    this.setState({
		      buttonStatus: false
		    });
		  }
		
	  }

	  flattenArray = (courseToDelete) => {
	      let tempPlan = this.props.acadplans.map(plans => plans.plan);
	      let newPlanArray = [].concat.apply([], tempPlan);
	      const i = newPlanArray.indexOf(courseToDelete);
	      if(i !== -1){
	        const deletePlan = newPlanArray.splice(i, 1);
	        console.log(deletePlan);
	        this.props.setNewPlan(newPlanArray);
	        this.props.handleButton(newPlanArray);

	        this.setState({
	          plan: newPlanArray
	        })
	      };
	  }

	render(){
		const semesters = Array.from(new Set(this.props.acadplans.map(plans => 
						plans.plan.map(semester => 
						semester.split(',')[0]
					))[0]));				

		return(
		
		<div className="container">
		  <div className="row edit-form">
		    <div className="form-group col-md-4">
		      <label htmlFor="inputSemester">Semester</label>
		      <select id="inputSemester" 
		      			className="form-control"
		      			onChange={e => this.setSemester(e.target.value)}
		      			required
		      			type="select">
		        	<option defaultValue>Choose...</option>
		        	{semesters.map((semester, index) => 
		        		<option key={index} value={semester}>{semester}</option>
		        	)}
		      </select>
		    </div>

		    <div className="form-group col-md-4">
		      <label htmlFor="courseToDelete">Select a course</label>
		      <select id="courseToDelete" 
		      			className="form-control"
		      			onChange={e => this.setCourseToDelete(e.target.value)}
		      			required
		      			type="select">
		        	<option defaultValue>Choose...</option>
					{this.props.acadplans.map(plans => 
							plans.plan.map(courses => 
								courses.split(','))).map(course => 
									course.filter(elem => 
										elem.includes(this.state.semester))).map(planList => 
											planList.map(courseInfo => 
											<option className="list-group-item" 
													key={courseInfo[2]} 
													value={`${courseInfo[0]},${courseInfo[1]},${courseInfo[2]},${courseInfo[3]}`}>
													{courseInfo[0]}, {courseInfo[1]}, {courseInfo[2]}, {courseInfo[3]}
											</option>
						))					
					}
		      </select>
		    </div>		    
		  </div>
		  </div>
		);

	}

}


export default EditAcadPlans;


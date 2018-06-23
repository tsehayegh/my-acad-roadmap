

import React from 'react';

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

	flattenArray = (courseToDelete) => {
      let tempPlan = this.props.acadplans.map(plans => plans.plan);
      let newPlanArray = [].concat.apply([], tempPlan);
      const i = newPlanArray.indexOf(courseToDelete);
      if(i !== -1){
        const deletePlan = newPlanArray.splice(i, 1);
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

		let enableButton = true;
		if(this.state.semester !== null && this.state.courseToDelete !== null){
			enableButton = (this.state.semester.includes('Choose') && this.state.courseToDelete.includes('Choose'));
		} 

		return(
		
		<div className="container edit-form">
			<h2>Delete a course </h2>
			  <div className="row">
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


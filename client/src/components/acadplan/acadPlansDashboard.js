
import React from 'react';

import {connect} from 'react-redux';

import {fetchAcadPlans} from '../../actions/catalogActions'

import requiresLogin from '../auth/requires-login';

import {API_BASE_URL} from '../../config';

import './acadPlansDashboard.css';

export class AcadPlanDashboard extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userid: '',
			programcode: '',
			semester: '',
			newPlan: [],
			existingPlan: [],
			buttonStatus:true
		}
	}

	componentDidMount() {
		const searchQuery= `?username=${this.props.currentUser.username}`;
		this.props.dispatch(fetchAcadPlans(searchQuery));
		this.setState({
			existingPlan: this.props.acadplans
		})
	}


	setNewPlan = (nPlan) =>{
		this.setState({
			newPlan: nPlan
		});    
	}

	handleButton = (courseToDlete) => {
	    if(courseToDlete.length > 10) {
	        this.setState({
	          buttonStatus: false
	        });
	    } else {
	    	this.setState({
	    		buttonStatus: true
	    	})
	    }
	}

	flattenArray = (courseToDelete) => {
		this.setState({
			existingPlan: this.props.acadplans
		});
	  let tempPlan = this.state.existingPlan.map(plans => plans.plan);
	  let newPlanArray = [].concat.apply([], tempPlan);
	  const i = newPlanArray.indexOf(courseToDelete);
	  if(i !== -1){
	    const deletePlan = newPlanArray.splice(i, 1);
	    this.props.setNewPlan(newPlanArray);
	    this.setState({
	      newPlan: newPlanArray
	    })
	  }; 
	}

	handleSubmit = (event) => {
		event.preventDefault();
		let confirmText = '';
		const dialogMessage = "Are you sure you wish to delete the course from the plan?"
		const userResponse = window.confirm(dialogMessage);
		if(userResponse === true){
			const plan = [].concat.apply([],this.props.acadplans.map(plans => plans.plan));
	        const courseToBeDeleted = plan.filter(courses => courses.includes(event.target.id));
	        if(courseToBeDeleted){
		        const i = plan.indexOf(courseToBeDeleted[0]);
		      	if(i !== -1){
			        const deletePlan = plan.splice(i, 1);
			        this.setState({
			          plan: plan,
			          newPlan: plan,
			          existingPlan: plan
			        })
		      	}; 	
	      	}
	        const plans = {
	          username: this.props.currentUser.username,
	          firstname: this.props.currentUser.firstName,
	          lastname: this.props.currentUser.lastName,
	          programcode: this.props.currentUser.programcode,
	          plan: plan
	        }
	        const searchQuery = `?username=${plans.username}`;
	        const userId = this.props.acadplans.map(plans => plans.id)[0];
	        plans.id = userId;
	        return fetch(`${API_BASE_URL}/acadplan/${userId}`, {
	          method: 'PUT',
	          body: JSON.stringify(plans),
	          headers: {
	            'Content-Type': 'application/json'
	          }
	        })
	        .then(() => {
	          return this.props.dispatch(fetchAcadPlans(searchQuery));
	        })
	        .then(() => {
	        	this.setState({
	        		buttonStatus: true
	        	});
	        	return this.props.history.push({
	                        pathname: '/dashboard',
	                        state: {detail: plans}
	                        });

	        	})
	        .then(() => console.log('successful'))
       }

	}

	render(){
		const semesters = Array.from(new Set(this.props.acadplans.map(plans => 
						plans.plan.map(semester => 
						semester.split(',')[0]
					))[0]));

		semesters.sort(function(x,y) {
			const xp = x.substr(-4);
			const yp = y.substr(-4);
			return xp === yp ? 0 : xp < yp ? -1 : 1;
		})

		let noPlan = '';
		if(semesters.length === 0) {
			noPlan = 
				<div>
					<p>You have not started to plan your academic program yet. Go to 'Plan my Program' to plan your program!</p>
				</div>
		} else {
			noPlan=	<p>Courses you have planned for your academic program to take in each each semester. 
						You can delete a course from the academic plan by clicking the 'X' icon at the end of
						each course. 
				</p>
		}

		return (
			<div className="dashboard row" id="dashboard">
				<h3><strong>Program </strong>: {this.props.currentUser.programcode} </h3>
				<h4><strong>Dashboard </strong></h4>
				<br/>
				{noPlan}
						{semesters.map(semester =>
							<div className="semester-plan-container" key={semester} aria-live="polite">
								<ul className="list-group" key={semester} id="semester-plan">
									<h3>{semester}</h3> 
									{this.props.acadplans.map(plans => 
											plans.plan.map(courses => 
												courses.split(','))).map(course => 
													course.filter(elem => 
														elem.includes(semester))).map(planList => 
															planList.map((courseInfo, index) => 
															<li className="list-group-item dashboard-list" 
																key={courseInfo[2]}
																>
																{courseInfo[1]}, {courseInfo[2]}, {courseInfo[3]}
																<span id={courseInfo[2]} 
																	className="delete-course"
																	tabIndex="0"
																	role="button"
																	key={courseInfo[2]}
																	onClick={(event) => this.handleSubmit(event)}
																	onKeyPress={event => this.handleSubmit(event)}>
																	&times;
																</span>

															</li>
										))					
									}
								</ul>
							</div>
						
						)}
				
			</div>
		)
	}
}

function mapStateToProps(state, ownProps){
	return{
		acadplans: state.catalogReducer.acadplans,
		currentUser: state.auth.currentUser,
		coursecatalog: state.catalogReducer.coursecatalog
	}
};

AcadPlanDashboard.defaultProps = {
	acadprogram: null,
	acadplans: [],
	coursecatalog: []
}

export default requiresLogin()(connect(mapStateToProps)(AcadPlanDashboard));








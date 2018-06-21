

import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import { ToastContainer, toast } from 'react-toastify';


import {connect} from 'react-redux';

import {fetchAcadPlans} from '../../actions/catalogActions'

//import AcadPlansList from './acadPlansList';

import requiresLogin from '../auth/requires-login';

import EditAcadPlans from './editAcadPlans';

import {API_BASE_URL} from '../../config';

import './acadPlansDashboard.css';

import AlertPage from '../alerts';

class AcadPlanDashboard extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userid: 'peace',
			programcode: 'A10500',
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
			existingPlan: this.props.acadplans.map(plans => plans.plan)
		})
		console.log(this.state.existingPlan);
	}


	setNewPlan = (nPlan) =>{
		this.setState({
			newPlan: nPlan
		});    
	}

	  handleButton = (nPlan) => {
	  	console.log(nPlan);
	    if(nPlan.length > 0) {
	        this.setState({
	          buttonStatus: false
	        });
	    }
	  }

	 notify = (type) =>{
	 	return() => {
	 		toast("Default Notification !");
	 		switch (type) {
	 			case 'info':
	 				toast.info('Info message', {
	 					autoClose: 3000
	 				});
	 				break;
 				case 'success':
 					toast.success('Course deleted from plan successfully!', {
 						position: toast.POSITION.BOTTOM_RIGHT,
 					});
 					break;
			    case 'warning':
			        toast.warn('Warning message');
			        break;
			    case 'error':
			        toast.error('Error message');
			        break;
	 		}
	 	};
	 };

	handleSubmit = () => {
		let tempPlan = this.state.newPlan;
        const newPlanArray = [].concat.apply([], tempPlan);
        const plans = {
          username: this.props.currentUser.username,
          firstname: this.props.currentUser.firstName,
          lastname: this.props.currentUser.lastName,
          programcode: this.props.currentUser.programcode,
          plan: newPlanArray
        }
        const searchQuery = `?username=${plans.username}`;
        const userId = this.props.acadplans.map(plans => plans.id)[0];
        const sPlan = this.props.acadplans.map(plans => plans.plan)
        plans.id = userId;
        
        if(plans.plan.length !== this.state.existingPlan.length){
	        return fetch(`${API_BASE_URL}/acadplan/${userId}`, {
	          method: 'PUT',
	          body: JSON.stringify(plans),
	          headers: {
	            'Content-Type': 'application/json'
	          }
	        })
	        .then(() => {
	          this.props.dispatch(fetchAcadPlans(searchQuery));
	        })
	        .then(() => {

	        	this.props.history.push({
	                        pathname: '/dashboard',
	                        state: {detail: plans}
	                        });
	        	//window.location.reload();

	        	})
	        .then(() => this.showAlert('success'))
	    }
	}





	render(){

		const programcode= this.props.acadplans.map(plan => plan.programcode);

		const semesters = Array.from(new Set(this.props.acadplans.map(plans => 
						plans.plan.map(semester => 
						semester.split(',')[0]
					))[0]));

		semesters.sort(function(x,y) {
			const xp = x.substr(-4);
			const yp = y.substr(-4);
			return xp === yp ? 0 : xp < yp ? -1 : 1;
		})

		let semesterTotalCredits = 0;

		let edit = '';
		if(semesters.length > 0) {
				edit =	
				<div>
					<EditAcadPlans acadplans={this.props.acadplans} 
										currentUser={this.props.currentUser}
										setNewPlan={this.setNewPlan} 
										handleButton={this.handleButton}/>
					<button className={`btn btn-lg btn-success`} 
							type="submit"
							onClick={e => this.handleSubmit(e.target)}
							disabled={this.state.buttonStatus}
							>

							Delete
					</button>
				</div>
		}

		return (
			<div className="container" id="dashboard">
				<h3>Program: {this.props.currentUser.programcode} </h3>
				<div className="row">
						{semesters.map(semester =>
							<div className="col-sm-6" key={semester}>
								<ul className="list-group" key={semester}>
									<h3>{semester}</h3> 
									{this.props.acadplans.map(plans => 
											plans.plan.map(courses => 
												courses.split(','))).map(course => 
													course.filter(elem => 
														elem.includes(semester))).map(planList => 
															planList.map(courseInfo => 
															<li className="list-group-item" key={courseInfo[2]}>
																{courseInfo[1]}, {courseInfo[2]}, {courseInfo[3]} credit hours
															</li>
										))					
									}
								</ul>
							</div>
						
						)}
						{edit}

				</div>
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








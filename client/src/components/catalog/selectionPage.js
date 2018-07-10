import React from 'react';
import PropTypes from 'prop-types';



import {connect} from 'react-redux';

import {fetchCatalog} from '../../actions/catalogActions'


import SelectionsPage from './selectionsPage';

import requiresLogin from '../auth/requires-login';

import './selectionPage.css';

class SelectionPage extends React.Component {
 	componentDidMount() {
 		const searchQuery = `?username=${this.props.currentUser}`;
		let programcode = this.props.currentUser.programcode.split(',');
		if (programcode.length > 1) {
			programcode = programcode[1].trim();
		} 
		this.props.dispatch(fetchCatalog(`${programcode}`));
	}

	   componentWillMount = () => {
	    this.selectedCheckboxes = new Set();
	  }

	  constructor(props) {
	    super(props);
	    this.state = {
	    	isChecked: false,
	    	newPlan: [],
	    };
	  }

	  toggleCheckboxChange = () => {

	    this.setState(({ isChecked }) => (
	      {
	        isChecked: !this.state.isChecked,
	      }
	    ));
	    
	  }

	  toggleCheckbox = label => {
	    if (this.selectedCheckboxes.has(label)) {
	      this.selectedCheckboxes.delete(label);
	    } else {
	      this.selectedCheckboxes.add(label);
	    }
	  }


	  handleChecked () {
	    this.setState({isChecked: !this.state.isChecked});
	  }

	    handleFormSubmit = formSubmitEvent => {
	    formSubmitEvent.preventDefault();
	    for (const checkbox of this.selectedCheckboxes) {
	      this.setNewPlan(checkbox);
	    }
	  }

	  setNewPlan(currentPlan){
	  	this.setState({
	  		newPlan: [...this.state.newPlan, currentPlan]
	  	})
	  }

	makeValueLink(key) {
	  return {
	    value: this.state[key],
	    requestChange: function(newValue) {
	      let newState = {};
	      newState[key] = newValue;
	      this.setState(newState);
	    }
	  }
	}



	render() {
		
		return(
			<SelectionsPage>
				<div className="row">
				<h2>Select Course(s)</h2>
				<form onSubmit={this.handleFormSubmit}>
				<ul className="list-group">
					{this.props.groupcourses.map(courses =>
						courses.map((course, index) => 
							<li className="list-group-item" key={index}>
								<div className="form-check">
								    <input type="checkbox" 
								    		className="form-check-input"
								    		id={`${course[0]}, ${course[1]}, ${course[2]}`}
								    		key={course[1]}
								    		label={`${course[0]}, ${course[1]}, ${course[2]}`}
								    		onChange={event => this.toggleCheckbox(event.target.id)}
								    		/>
								    <label className="form-check-label" 
								    		htmlFor={course[1]}>{`${course[0]}, ${course[1]}, ${course[2]} credit hours`}</label>
								</div>
							</li>
						))
					}
				</ul>
				<button className="btn btn-lg btn-success" type="submit" >Save</button>
				</form>
				</div>
			</SelectionsPage>
			
		)
	}
}



SelectionPage.propTypes = {
	coursecatalog: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps){
	console.log(state);
	let groupId = '';
	if(ownProps.match) {
		groupId = ownProps.match.params.group;
	}
	const courses = state.catalogReducer.coursecatalog.map(catalog => 
							catalog.courses.map(courses => 
							courses.split(','))).map(course => 
							course.filter(elem => 
							Number(elem[3]) === Number(groupId)));
	
	return {
			coursecatalog: state.catalogReducer.coursecatalog,
			groupcourses: courses,
			acadplans: state.catalogReducer.acadplans,
			currentUser: state.auth.currentUser
		}
};


export default requiresLogin()(connect(mapStateToProps)(SelectionPage));





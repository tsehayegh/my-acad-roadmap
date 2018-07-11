

import React from 'react';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchCatalog} from '../../actions/catalogActions'

import requiresLogin from '../auth/requires-login';


import SelectionList from './selectionList';

import './selectionsPage.css';

class SelectionsPage extends React.Component {

	static propTypes ={
		groups: PropTypes.array.isRequired
	}

	componentDidMount() {
		let programcode = this.props.currentUser.programcode.trim().split(',');
		if (programcode.length > 1) {
			programcode = programcode[1].trim();
		} 


		return this.props.dispatch(fetchCatalog(`${programcode}`));
	}

	constructor(props){
		super(props);
		this.state = {
			linkstatus: 'enabled-link',
			selectedGroup: false,
			couresToSelectPerGroup: 0,
			selectedGroupId: 0,
			selectedCountPerGroup:0,
			information: ''
		}
		this.formCheckbox = this.formCheckbox.bind(this);
	}


	setSelectedGroup =() => {
		this.setState({
			selectedGroup: true
		})
	}

	setCoursesToSelectPerGroup = (count, groupId) => {
		this.setState({
			couresToSelectPerGroup: count,
			selectedGroupId: groupId
		});
	}

	setSelectCountPerGroup(c){
	    this.setState({
	      selectedCountPerGroup: c
	    })
  	}

	formCheckbox(params){
		if(params){
			this.setState({
				linkstatus: 'disabledlink'
			})
		} else {
			this.setState({
				linkstatus: 'enabledlink'
			})			
		}
	} 

	
	clearInformation = () =>{
	    this.setState({
	      information: ''
	    });
  	}

	render() {
	

		let howToPlan = '';
		if(this.props.location && this.props.location.pathname === '/plan') {
			howToPlan = ( 
						<div className="checkbox-creator how-to" id="checkbox-creator">	
	        				<h4>How to plan your program:</h4>
	        				<p>
	        						All academic programs have a set of courses that a student has to take in toder to graduate. 
	        						Student have to take pre-specified courses from group of courses. For example, for this particular academic program, a student has to take
	        						one course from the second group. Courses are grouped based on their contents and requirements for an academic program.
	        						The app helps students to plan all needed courses for their academic programs so the students know the courses they
	        						will take each semester and year.
	        				</p>
	        				<br/>
	        				<br/>
	        				<ol>
	        					<li>Select a group on the left hand side</li>
	        					<li>Select a semester</li>
	        					<li>Enter a 4-digit year (Ex. 2018)</li>
	        					<li>Select a course or courses you want to take</li>
	        					<li>Select another group if you want to add more course</li>
	        					<li>Click the 'Save' button to save your plan </li>
	        					<li>To change a course, go to Dashboard, delete the course, and come back to this page to add it</li>
	        				</ol>
		            	</div>
	            	)
		}
		return (
			<section className="selections-page row" id="selections-page">
				<h3 className="program"><strong>Program</strong>: {this.props.currentUser.programcode} </h3>
				<h4 className="text-left"><strong>Plan my Program </strong></h4>
						<SelectionList 
							selectedGroup={this.setSelectedGroup}
							setCoursesToSelectPerGroup={this.setCoursesToSelectPerGroup}
							selectedCountPerGroup={this.selectedCountPerGroup}
							clearInformation={this.clearInformation}
						/>
					
					{howToPlan}
					<div className="course-select">
						{this.props.children}
					</div>								

			</section>
		)
	}
}

SelectionsPage.defaultProps = {
	groups: [],
	coursecatalog: []
}


function mapStateToProps(state, ownProps){
	return {
	coursecatalog: state.catalogReducer.coursecatalog,
	groups: state.catalogReducer.coursecatalog.map(catalog => 
							catalog.courses.map(courses => 
							courses.split(',')[3]
						)).reduce(function(acc, cur, index) {
						cur.forEach(function(item) {
							if(acc[item] === undefined) {
								acc.push(item);
							}
						});
						return acc;
					}, []),
	linkstatus: state.catalogReducer.linkstatus,
	acadplans: state.catalogReducer.acadplans,
	currentUser: state.auth.currentUser
}
};

export default requiresLogin()(connect(mapStateToProps)(SelectionsPage));






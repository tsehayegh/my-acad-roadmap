
import React from "react";
import {Redirect} from "react-router-dom";
import { connect  } from 'react-redux';

import './home.css';

class Home extends React.Component {

	render() {
		return(
			<section className="home-page row">
				<div className="home">
					<p>
						The app, My Acad Roadmap, short for My Academic Roadmap, helps you to plan your program of study. 
	    			</p>
				    
				     <strong>You will be able to:</strong> 
					<ol>
						<li>Select a group of courses</li>
						<li>Select a semester</li>
						<li>Select one or more course to plan</li>
						<li>Save the courses you selected</li>
						<li>See your program plan for all semesters</li>
						<li>Delete a course from any semester</li>
						<li>See your program and short profile</li>
					</ol>
					<p></p>
				</div>
			</section>
		)
	}
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Home);


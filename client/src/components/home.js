
import React from "react";
import {Redirect} from "react-router-dom";
import { connect  } from 'react-redux';

import './home.css';

class Home extends React.Component {

	handleClick(e){
		e.preventDefault();
       	<Redirect to="/login" />;

	}

	render() {
        const infoTop = <label>
					The app, My Acad Roadmap, short for My Academic Roadmap, helps you to plan your program of study. 
        </label>

        const infoBottom = 
					<ol>
						<li>Select a group of courses</li>
						<li>Select a semester</li>
						<li>Select one or more course you want to plan</li>
						<li>Save the courses you selected</li>
						<li>See your program plan for all semesters</li>
						<li>Delete a course from any semester</li>
						<li>See your program and short profile</li>
					</ol>

		return(
			<section className="container home">
				    {infoTop}
				    <br />
				         <strong>You will be able to:</strong> 
			        {infoBottom}
			</section>
		)
	}
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Home);


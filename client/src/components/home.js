
import React from "react";
import {Link} from "react-router-dom";

import './home.css';


class Home extends React.Component {
	render() {
		const information = 
				<label>
					Welcome to My Acad Raodmap!
					<br />
					The app, My Acad Roadmap, short for My Academic Roadmap, is an app that helps you to plan your program of study. 
					<h2> Features </h2>
					<ol>
						<li>Select a group of courses</li>
						<li>Select a semester that you want to take a course</li>
						<li>Select one or more course that you want to take in the selected semester</li>
						<li>Save the courses you selected</li>
						<li>See your program plan for all semesters</li>
						<li>Delete a course from any semester</li>
					</ol>
				</label>

		return(
			<div className="container" id="home">
				<h1 className="app-name">My Acad Roadmap </h1>
				<br />
				{information}
				<div className="col-lg text-center">
				<Link to="/login" className="btn btn-lg btn-primary btn-Link">Start</Link>
				</div>
			</div>
		)
	}
}

export default Home;
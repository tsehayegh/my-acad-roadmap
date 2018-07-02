
import React from "react";
import {Redirect} from "react-router-dom";
import { connect  } from 'react-redux';

import './home.css';

class Home extends React.Component {
	render() {
		if (this.props.loggedIn) {
            return <Redirect to="/dashboard" />;
        }

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
			<div id="accordion" className="home">
			  <div className="card">
			    <div className="card-header" id="headingOne">
			      	<div className="mb-0">
				      	{infoTop}
				        <button className="btn btn-lg btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
				          <strong>Features...</strong> 
				        </button>
			      	</div>
			    </div>
			    <div id="collapseOne" className="collapse hide infoBotton" aria-labelledby="headingOne" data-parent="#accordion">
			      <div className="card-body">
			      	<p>You will be able to: </p>
			        {infoBottom}
			      </div>
			    </div>
			  </div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Home);


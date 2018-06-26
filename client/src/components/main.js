import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, 
	Route} from 'react-router-dom';

import Navbar from './navbar';
import SelectionsPage from './catalog/selectionsPage';
import CheckboxApp from './catalog/checkboxapp';
import AcadPlansDashboard from './acadplan/acadPlansDashboard';
import LoginForm from './auth/login-form';
import RegistrationPage from './auth/registration-page';
import UserProfile from './auth/user-profile';
import Home from './home';

export class Main extends React.Component {
	render() {
		return(
			<Router>
				<div>
					<Navbar />	
						<Route exact path='/' component={LoginForm}/>
						
						<Route exact path='/home' component={Home}/>

						<Route exact path='/dashboard' component={AcadPlansDashboard} />

						<Route exact path='/register' component={RegistrationPage} />

						<Route exact path='/profile' component={UserProfile} />

						<Route exact path='/plan' component={SelectionsPage} /> 

						<Route exact path='/plan/:group' component={CheckboxApp}/>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = state => {
	return {
	coursecatalog: state.catalogReducer.coursecatalog,
	acadplans: state.catalogReducer.acadplans, 
	currentUser: state.auth.currentUser,
	loggedIn: state.auth.currentUser !== null,
	}
}

export default (connect(mapStateToProps)(Main));




import React from 'react';

import {connect} from 'react-redux';

import {BrowserRouter as Router, Redirect, 
	Route, Switch, withRouter} from 'react-router-dom';
import requiresLogin from './auth/requires-login';


import {fetchCatalog, fetchAcadPlans} from '../actions/catalogActions'

import Navbar from './navbar';

import SelectionsPage from './catalog/selectionsPage';
import SelectionPage from './catalog/selectionPage';
import CheckboxApp from './catalog/checkboxapp';

import AcadPlansDashboard from './acadplan/acadPlansDashboard';

import LoginForm from './auth/login-form';

import RegistrationForm from './auth/registration-form';
import RegistrationPage from './auth/registration-page';
import App from './auth/app';
import HeaderBar from './auth/header-bar';

import Home from './home';

import UserProfile from './auth/user-profile';


export class Main extends React.Component {
	render() {
		const loggedIn = this.currentUser !== null;
		return(
			<Router>
				<div>
					<Navbar />	

						<Route exact path='/' component={Home}/>

						<Route exact path='/login' component={LoginForm}/>

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




import React from 'react';

import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import requiresLogin from './auth/requires-login';


import {fetchCatalog} from '../actions/catalogActions';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import './navbar.css';

export class Navbar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			dropdownOpen: false,
			selectedMenuBar: 0,
			key: 0
		}
	}

	setKey(e){
		this.setState({
			key: e
		});
	}

	logOut(e) {
		e.preventDefault();
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    setSelectedMenuBar(e){
    	e.preventDefault();
    	this.setState({
    		selectedMenuBar: e
    	})
    }

	handleOnClick(e) {
		e.preventDefault();
		let programcode = this.props.currentUser.programcode.split(',');
		if (programcode.length > 1) {
			programcode = programcode[1].trim();
		} 
		this.setState({
			key: 1
		});

		return this.props.dispatch(fetchCatalog(`${programcode}`));

	}

	goToDashboard(e){
		e.preventDefault();
        this.props.history.push({
            pathname: '/dashboard'
        	});
	}

	refreshPage(){
		window.location.reload();
	}

	render() {
		return(

			<nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
				<div className="container ">
				  <Link className="navbar-brand text-white" data-toggle="collapse" to="/home">My Acad Roadmap</Link>

				  <button type="button" className="navbar-toggler navbar-toggler-righ collapsed"  
				  		data-toggle="collapse" data-target="#navbarSupportedContent" 
				  		aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				    <span className="navbar-toggler-icon"></span>
				  </button>

				  	<div className="collapse navbar-collapse text-white" id="navbarSupportedContent">
					    <ul className="nav navbar-nav mr-auto">
					      <li className="nav-item plan" onClick={e => this.setKey(1)} key={1}>
					        <Link className="nav-link text-white plan-link" 
					        		id={this.state.key === 1 ? 'activeTab' : '' } 
					        		to="/plan" 
					        		onClick={this.refreshPage}>
					        		Plan my program
					        </Link>
					      </li>

					      <li className="nav-item" onClick={e => this.setKey(2)} key={2}>
					        <Link className="nav-link text-white" 
					        		id={this.state.key === 2 ? 'activeTab' : '' }
					        		to="/dashboard" 
					        		onClick={this.refreshPage}>
					        		Dashboard
					        </Link>
					      </li>

					    </ul>
				        <ul className="nav navbar-nav navbar-right">

					      <li className="nav-item" onClick={e => this.setKey(3)} key={3}>
					      	<Link className="nav-link text-white" 
					      			id={this.state.key === 3 ? 'activeTab' : '' }
					      			to="/profile"
					      			onClick={this.refreshPage}>
					      			Profile ({this.props.username})
					      	</Link>
					      </li>

					      <li className="nav-item">
					      	<Link className="nav-link text-white"
					      		to ='/login' 
					      		onClick={e => this.logOut(e)}>Log out
					      	</Link>
					      </li>

					    </ul>
				  	</div>
			  </div>
			</nav>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
    const {currentUser} = state.auth;
    return {
    	currentUser: state.auth.currentUser,
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        acadplans: state.catalogReducer.acadplans,
       	coursecatalog: state.catalogReducer.coursecatalog
    };
};

export default requiresLogin()(connect(mapStateToProps)(Navbar));

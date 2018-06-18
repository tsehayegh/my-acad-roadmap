import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect, BrowserRouter as Router} from 'react-router-dom';

import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Router>
                <Redirect to="/dashboard" /> 
                </Router>;
    }

    return (
        <div className="home">
            <h2>Welcome to My Acad Roadmap</h2>
            <LoginForm />
            <Link to="/register">Register</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
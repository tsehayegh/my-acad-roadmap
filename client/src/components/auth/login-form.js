import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import { withRouter, Link, Redirect, BrowserRouter as Router, NavLink } from 'react-router-dom';

import { connect  } from 'react-redux';

import {clearAuthToken} from './local-storage';
import {clearAuth} from '../../actions/auth';

import Navbar from '../navbar';
import Input from './input';
import {login} from '../../actions/auth';
import {required, nonEmpty} from './validators';

import './login-form.css';

export class LoginForm extends React.Component {

    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    render() {
         
        if (this.props.loggedIn) {
            return <Redirect to="/dashboard" />;
        }

        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }

        const renderField = ({ input, label, type, meta: { touched, error } }) => (
          <div>
            <label>{label}</label>
            <div>
              <input {...input} placeholder={label} type={type}/>
              {touched && error && <span>{error}</span>}
            </div>
          </div>
        )

        return (
            
            <div className="container">
            <div className="row">
            <div className="col-md-10 col-md-offset-1">
                <form
                    className="form-signin"
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    {error}
                    
                    <h2>My Acad Roadmap</h2>
                    <label htmlFor="username">Username</label>
                    <Field
                        component={Input}
                        type="text"
                        name="username"
                        id="username"
                        validate={[required, nonEmpty]}
                    />
                    <label htmlFor="password">Password</label>
                    <Field
                        component={Input}
                        type="password"
                        name="password"
                        id="password"
                        validate={[required, nonEmpty]}
                    />
                    <button className="btn btn-lg btn-primary" disabled={this.props.pristine || this.props.submitting}>
                        Log in
                    </button>

                    <Link to="/register" className="btn btn-lg btn-primary btn-Link" disabled={this.props.pristine || this.props.submitting}>Register</Link>
                </form>
                </div>
               </div>
               </div>
        
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(connect(mapStateToProps)(LoginForm));

import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import { Link, Redirect} from 'react-router-dom';

import { connect  } from 'react-redux';

import Input from './input';
import {login} from '../../actions/auth';
import {required, nonEmpty} from './validators';

import './login-form.css';

import Home from '../home';


export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    render() { 
        const style = {
            borderRadius: '5px'
        };

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
          <div className="container">
            <label>{label}</label>
            <div>
              <input {...input} placeholder={label} type={type}/>
              {touched && error && <span>{error}</span>}
            </div>
          </div>
        )

        return (
            <div className="login" id="login-form" style={style}>
                <div className="row">
                <div className="col-12">
                    <h1 className="app-name">My Acad Roadmap </h1>
                    
                    <Home />
                <form
                    className="form-signin"
                    id="form-signin" style={style}
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    <label className="warning">{error}</label>
                     
                    <label htmlFor="username">Username</label>
                    <Field
                        component={Input}
                        type="text"
                        name="username"
                        id="username"
                        validate={[required, nonEmpty]}
                        placeholder="Example: test"
                    />
                    <label htmlFor="password">Password</label>
                    <Field
                        component={Input}
                        type="password"
                        name="password"
                        id="password"
                        validate={[required, nonEmpty]}
                        placeholder="Example: asdfghjklq"
                    />
                    <div className="col-lg text-center">
                        <button className="btn btn-lg btn-primary" disabled={this.props.pristine || this.props.submitting}>
                            Log in
                        </button>
                    </div>
                    <label> Not registered yet, 
                        <Link to='/register'> Register </Link> Now
                        </label>
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

import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import { Link } from 'react-router-dom';

import {registerUser} from '../../actions/users';
import {login} from '../../actions/auth';
import Input from './input';

import {required, nonEmpty, matches, length, isTrimmed} from './validators';

import './registration-form.css';

const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');


export class RegistrationForm extends React.Component {
    
    onSubmit(values) {
        const {username, password, firstName, lastName, programcode} = values;
        const user = {username, password, firstName, lastName, programcode};
        console.log(user);
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        const style = {
            borderRadius: '5px',
            maxWidth: '360px'
        };
        return (
            <div className="reg-form row">

                <div className="reg-app">
                    <p className="reg-app-header">
                        <i className="fa fa-graduation-cap"></i>
                        My Acad Roadmap 
                    </p>
                </div>

                <form
                    className="form-signin reg" 
                    id="form-signin" style={style}
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>

                    
                    <label htmlFor="firstName">First name</label>
                    <Field component={Input} 
                            type="text" 
                            name="firstName" 
                            className="col-6"
                            validate={[required, nonEmpty, isTrimmed]}
                    />

                    <label htmlFor="lastName">Last name</label>
                    <Field component={Input} 
                            type="text" 
                            name="lastName" 
                            className="col-6"
                            validate={[required, nonEmpty, isTrimmed]}
                    />
                    
                    <label htmlFor="programcode">Academic Program</label>
                    <Field name="programcode"
                            className="program-selection" 
                            component='select'
                            validate={[required, nonEmpty, isTrimmed]}
                            type="select"
                            required>
                        <option />
                        <option value="Accounting and Finance, A25800A">Accounting and Finance, A25800A</option>
                    </Field>

                    <label htmlFor="username">Username</label>
                    <Field
                        component={Input}
                        type="text"
                        name="username"
                        validate={[required, nonEmpty, isTrimmed]}
                    />
                    <label htmlFor="password">Password</label>
                    <Field
                        component={Input}
                        type="password"
                        name="password"
                        validate={[required, passwordLength, isTrimmed]}
                    />
                    <label htmlFor="passwordConfirm">Confirm password</label>
                    <Field
                        component={Input}
                        type="password"
                        name="passwordConfirm"
                        validate={[required, nonEmpty, matchesPassword]}
                    />

                    <div className="col-lg text-center">
                        <button
                            className="btn btn-lg btn-primary btn-Link"
                            type="submit"
                            disabled={this.props.pristine || this.props.submitting}>
                            Register
                        </button>
                    </div>
                    <label>Already registered, <Link to='/'> Log in </Link></label>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
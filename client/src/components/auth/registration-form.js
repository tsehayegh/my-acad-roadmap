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
        console.log(this.props);

        return (
            <div className="container" id="reg-form">
            <div className="row">
            
            <form
                className="form-signin" id="form-signin"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <h2>My Acad Roadmap</h2>
                <label htmlFor="firstName">First name</label>
                <Field component={Input} type="text" name="firstName" className="col-6"/>
                <label htmlFor="lastName">Last name</label>
                <Field component={Input} type="text" name="lastName" />
                
                <div>
                    <label htmlFor="programcode">Academic Program</label>
                    <div>
                        <Field name="programcode"
                                className="program-selection" 
                                component='select'
                                validate={[required, nonEmpty, isTrimmed]}
                                type="select"
                                required>
                            <option />
                            <option value="Accounting and Finance, A25800A">Accounting and Finance, A25800A</option>
                        </Field>
                    </div>
                </div>


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
                <label>Already registered? Click log in</label>
                <div className="col-lg text-center">
                    <Link to='/' className="btn btn-lg btn-primary btn-Link">Log in</Link>
                </div>
            </form>
            </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
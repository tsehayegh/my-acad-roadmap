import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';

import './user-profile.css';

export class UserProfile extends React.Component {

    render() {
        console.log(this.props);
        return (
            <div className="container user-profile">
                <div>
                    <img className="sample-img" src = './backgroundimage.jpg' />
                </div>
                <div>
                    <strong>Username:</strong> {this.props.username}
                </div>
                <div>
                    <strong>Name:</strong> {this.props.name}
                </div>
                <div>
                    <strong>Academic Program:</strong> {this.props.programcode} 
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    const {currentUser} = state.auth;
    return {
        username: currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        programcode: currentUser.programcode
    };
};

export default requiresLogin()(connect(mapStateToProps)(UserProfile));

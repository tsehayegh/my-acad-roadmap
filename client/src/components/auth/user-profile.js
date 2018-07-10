import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';

import './user-profile.css';

export class UserProfile extends React.Component {

    render() {
        return (
            <div className="container user-profile">
                <h4><strong>Profile </strong></h4>
                <div className="row">

                <div className="col">
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
                <div className="col text-center">
                    <img className="sample-img" src={require('./tse.jpeg')} alt={this.props.name} />
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        programcode: currentUser.programcode
    };
};

export default requiresLogin()(connect(mapStateToProps)(UserProfile));

import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';


export class UserProfile extends React.Component {

    render() {
        console.log(this.props);
        return (
            <div className="container">
                <div>
                    Username: {this.props.username}
                </div>
                <div>Name: {this.props.name}</div>
                <div>Academic Program: {this.props.programcode} </div>
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

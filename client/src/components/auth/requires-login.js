import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';

export default () => Component => {
    function RequiresLogin(props) {
        const {authenticating, loggedIn, error, ...passThroughProps} = props;
        console.log(props);
        if (authenticating) {
            return <div className="container">Logging in...</div>;
        } else if (!loggedIn || error) {
            return <Redirect to="/login" />
            
        }
        return <Component {...passThroughProps} />;
    }

    const displayName = Component.displayName || Component.name || 'Component';
    RequiresLogin.displayName = `RequiresLogin(${displayName})`;

    const mapStateToProps = (state, props) => ({
        authenticating: state.auth.loading,
        loggedIn: state.auth.currentUser !== null,
        error: state.auth.error,
        anyTouch: state.auth.anyTouch
    });

    return connect(mapStateToProps)(RequiresLogin);
};
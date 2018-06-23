import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

export default () => Component => {

    function AlertPage(props) {
        const {processing, error, ...passThroughProps} = props;

        if (processing) {
            return <div className="container">Processing...</div>;
        } else if (error) {
            return <Redirect to="/login" />
            
        }
        return <Component {...passThroughProps} />;
    }


    const displayName = Component.displayName || Component.name || 'Component';
    AlertPage.displayName = `AlertPage(${displayName})`;

    const mapStateToProps = (state, props) => ({
        loggedIn: state.auth.currentUser !== null
    });
 
    return connect(mapStateToProps)(AlertPage);
};

import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router'

import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchCatalog, fetchAcadPlans} from '../../actions/catalogActions'

import requiresLogin from '../auth/requires-login';


import './selectionList.css';

class SelectionList extends React.Component {
 	componentDidMount() {
		let programcode = this.props.currentUser.programcode.split(',');
		if (programcode.length > 1) {
			programcode = programcode[1].trim();
		} 

		this.props.dispatch(fetchCatalog(`${programcode}`));
	}

	constructor(props){
		super(props);
		this.state = {
			linkstatus: 'enabled-link'
		}
	}
	render() {
		return (
			<ul className="list-group form-control-lg">
			<label>Select a Group to Plan </label>
				{this.props.groups.map((group,index) => 
					<li className="list-group-item" key={index}>
						Group{group}: 
						<Link to={'/plan/' + group} className={this.state.linkstatus}> 
							Take <span className="badge badge-info badge-pill">{this.props.coursecatalog[0].selection[index]}</span> courses from...
						</Link>
					</li>
				)}
			</ul>
		)
	}
}

SelectionList.propTypes = {
	coursecatalog: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps){
	const groups = Array.from(new Set(state.catalogReducer.coursecatalog.map(catalog => 
							catalog.courses.map(courses => 
							courses.split(',')[3]
						))[0]));
	return {
			coursecatalog: state.catalogReducer.coursecatalog,
			groups: groups,
			acadplans: state.catalogReducer.acadplans,
			currentUser: state.auth.currentUser
		}
};

export default requiresLogin()(connect(mapStateToProps)(SelectionList));
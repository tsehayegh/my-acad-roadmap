

import React from 'react';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchCatalog} from '../../actions/catalogActions'

import requiresLogin from '../auth/requires-login';


import SelectionList from './selectionList';

import './selectionsPage.css';

class SelectionsPage extends React.Component {

	static propTypes ={
		groups: PropTypes.array.isRequired
	}

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
		this.formCheckbox = this.formCheckbox.bind(this);

	}

	formCheckbox(params){
		if(params){
			this.setState({
				linkstatus: 'disabledlink'
			})
		} else {
			this.setState({
				linkstatus: 'enabledlink'
			})			
		}
	} 

	render() {
		return (
			<div className="container" id="selections-page">
			<h3 className="program"><strong>Program</strong>: {this.props.currentUser.programcode} </h3>
			<h4 className="text-center"><strong>Plan my Program </strong></h4>
				<div className="row">
					<div className="col-sm-5">
						<SelectionList />
					</div>
					<div className="col-sm-7">	
						{this.props.children}
					</div>									
				</div>
			</div>
		)
	}
}

SelectionsPage.defaultProps = {
	groups: [],
	catalogReducer: {},
	coursecatalog: []
}


const mapStateToProps = (state, ownProps) => ({

	coursecatalog: state.catalogReducer.coursecatalog,
	groups: state.catalogReducer.coursecatalog.map(catalog => 
							catalog.courses.map(courses => 
							courses.split(',')[3]
						)).reduce(function(acc, cur, index) {
						cur.forEach(function(item) {
							if(acc[item] === undefined) {
								acc.push(item);
							}
						});
						return acc;
					}, []),
	linkstatus: state.catalogReducer.linkstatus,
	acadplans: state.catalogReducer.acadplans,
	currentUser: state.auth.currentUser

});

export default requiresLogin()(connect(mapStateToProps)(SelectionsPage));






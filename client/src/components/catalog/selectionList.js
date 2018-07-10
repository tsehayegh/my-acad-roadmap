
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchCatalog} from '../../actions/catalogActions'

import requiresLogin from '../auth/requires-login';


import './selectionList.css';

class SelectionList extends React.Component {
 	componentDidMount() {
		let programcode = this.props.currentUser.programcode.split(',');
		if (programcode.length > 1) {
			programcode = programcode[1].trim();
		} 
		
		return this.props.dispatch(fetchCatalog(`${programcode}`));
	}

	constructor(props){
		super(props);
		this.state = {
			linkstatus: 'enabled-link',
			key: 0
		}
	}

	setKey(key){
		this.setState({
			key: key,
			groupId: key + 1

		});
		this.props.selectedGroup();
		this.props.setCoursesToSelectPerGroup(this.props.coursecatalog[0].selection[key], key+1);
	}

	render() {
		const howTo =`(1) Select a group from this list, 
						(2) Select a semester, 
						(3) Enter a 4-digit year (Ex. 2018), 
						(4) Select a course or courses you want to take, 
						(5) Select another group if you want to add more course, 
						(6) Click the 'Save' button to save your plan`;
		return (
			
			<div className="selection-list">
				<ul className="list-group form-control-lg" id="selection-list">
					<label>Select a Group of Courses</label>
					{this.props.groups.map((group,index) => 
						<li className="list-group-item" 
							onClick={() => this.setKey(index)} 
							key={index}
									data-toggle="tooltip" 
									data-placement="right" 
									title={howTo}
									trigger='hover focus'>
							Group {group}:  
							<Link to={'/plan/' + group} 
									className={this.state.linkstatus} 
									id={index === this.state.key ? 'active' : '' }
									value={this.state.key}
									> 
								{ } Take <span className="badge badge-info badge-pill"> {this.props.coursecatalog[0].selection[index]}</span> courses from...
							</Link>
						</li>
					)}
				</ul>
			</div>
			
		)
	}
}

SelectionList.propTypes = {
	coursecatalog: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps){
	const groups = Array.from(new Set(state.catalogReducer.coursecatalog.map(catalog => 
							catalog.courses.map(courses => 
							courses.split(',')[3].trim()
						))[0]));
	return {
			coursecatalog: state.catalogReducer.coursecatalog,
			groups: groups,
			acadplans: state.catalogReducer.acadplans,
			currentUser: state.auth.currentUser
		}
};

export default requiresLogin()(connect(mapStateToProps)(SelectionList));
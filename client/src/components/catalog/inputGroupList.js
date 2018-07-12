import React from 'react';

import './inputGroupList.css';

class InputGroupList extends React.Component {
	render(){
		return(
		<div className="input-group-list row" id="input-group-list">
			  <div className="form-row" id="input-group-row">

			    <div className="form-group">

			      <label htmlFor="inputSemester">Semester</label>
			      <select id="inputSemester" 
			      			className="form-control"
			      			onChange={e => this.props.setSemester(e.target.value)}
			      			type="select"
			      			disabled={this.props.selectedCount > 0}>
			        	<option defaultValue>Choose...</option>
			        	{this.props.semesterSelection.map((semester, index) => 
			        		<option key={index} value={semester}>{semester}</option>
			        	)}
			      </select>
			    </div>

			    <div className="form-group">
			      	<label htmlFor="inputYear">
			      			Year (YYYY)</label>
			      	<input type="text" 
			      			className="form-control" 
			      			id="inputYear" 
			      			onChange={e => this.props.setYear(e.target.value)}
			      			value={this.props.yearValue}
			      			required
			      			placeholder="Enter a year, Ex. 2018"
			      			disabled={this.props.inputBoxStatus || this.props.selectedCount > 0}
			      	/>
			    </div>
			  </div>
		  </div>
		)

	}
}

export default InputGroupList;
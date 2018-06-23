import React from 'react';

import './inputGroupList.css';

class InputGroupList extends React.Component {
	render(){
		return(
		<div className="container" id="input-group-list">
		  <div className="form-row" id="input-group-row">

		    <div className="form-group col-md-6">

		      <label htmlFor="inputSemester">Semester</label>
		      <select id="inputSemester" 
		      			className="form-control"
		      			onChange={e => this.props.setSemester(e.target.value)}
		      			type="select">
		        	<option defaultValue>Choose...</option>
		        	{this.props.semesterSelection.map((semester, index) => 
		        		<option key={index} value={semester}>{semester}</option>
		        	)}
		      </select>
		    </div>

		    <div className="form-group col-md-6">
		      	<label htmlFor="inputYear">Year (YYYY)</label>
		      	<input type="text" 
		      		className="form-control" 
		      		id="inputYear" 
		      		onChange={e => this.props.setYear(e.target.value)}
		      		required	
		      		placeholder="Enter a year, Ex. 2018"
		      	/>
		    </div>
		  </div>
		  </div>
		)

	}
}

export default InputGroupList;
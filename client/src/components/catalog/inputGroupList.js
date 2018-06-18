import React from 'react';
import {withRouter} from 'react-router-dom';

class InputGroupList extends React.Component {
	render(){
		return(
		  <div className="form-row">

		    <div className="form-group col-md-4">
		      <label htmlFor="inputSemester">Semester</label>
		      <select id="inputSemester" 
		      			className="form-control"
		      			onChange={e => this.props.setSemester(e.target.value)}
		      			required
		      			type="select">
		        	<option defaultValue>Choose...</option>
		        	{this.props.semesterSelection.map((semester, index) => 
		        		<option key={index} value={semester}>{semester}</option>
		        	)}
		      </select>
		    </div>

		    <div className="form-group col-md-4">
		      	<label htmlFor="inputYear">Year (YYYY)</label>
		      	<input type="text" 
		      		className="form-control" 
		      		id="inputYear" 
		      		onChange={e => this.props.setYear(e.target.value)}
		      		required	
		      	/>
		    </div>
		  </div>
		);

	}
}

export default InputGroupList;
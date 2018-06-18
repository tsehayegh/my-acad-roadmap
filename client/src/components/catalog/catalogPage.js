
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/catalogActions';

import CatalogList from './catalogList';

import CatalogListItem from './catalogListItem';

class CatalogPage extends React.Component {
	render() {
		return(
			<div className="col-md-12">
				<h1>Selection</h1>
				<div className="col-md-8">
					<CatalogList coursecatalog={this.props.coursecatalog} />
				</div>
				<div className="col-md-4">
					<h1>Catalog</h1>
					{this.props.children}
				</div>
			</div>
		);
	}
}

CatalogPage.propTypes = {
	coursecatalog: PropTypes.object.isRequired
};


const mapStateToProps = (state, ownProps) => ({
	coursecatalog: state.catalogReducer.coursecatalog
});

export default connect(mapStateToProps)(CatalogPage);
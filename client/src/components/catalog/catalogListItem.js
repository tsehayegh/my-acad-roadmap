import React from 'react';
import PropsType from 'prop-types'
import {Link, withRouter} from 'react-router-dom';

import CatalogPage from './catalogPage';

const CatalogListItem = ({coursecatalog}) => {
  return (
    <li className="list-group-item"><Link to={'/plan/' + coursecatalog.id}>{coursecatalog.courses}</Link></li>
  );
};

export default CatalogListItem;
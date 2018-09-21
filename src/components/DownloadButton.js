import React from 'react';
import PropTypes from 'prop-types';
import { getCsv } from '../actions/ApiActions';

const SearchRefResultsTable = function ({ results, period, query, props }) {
  function downloadFile() {
    const filter = Object.keys(results[0]).toString()
    props.dispatch(getCsv(query,filter,period))
  }
return(
  <button onClick={downloadFile} type="submit" className="btn btn--secondary margin-left-md--1" id="nav-search-submit">Download Frame</button>
);
};

  SearchRefResultsTable.propTypes = {
    results: PropTypes.object.isRequired,
  };

  export default SearchRefResultsTable;

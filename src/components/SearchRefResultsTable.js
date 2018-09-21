import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { lessThanFive } from '../utils/helperMethods';
import "react-table/react-table.css";
import '../resources/css/react-bootstrap-table-all.min.css';

const SearchRefResultsTable = function ({ results, period, query, props }) {
  function hideCol(header){
    for (var i in results){
      if (results[i][header] !== undefined){
        return true
      }
    }
    return false
  }
  return (
    <div>
      <ReactTable
        data={results}
        columns={[
          {
            Header: "Enterprise Reference",
            accessor: "entref"
          },
          {
            Header: "Enterprise Name",
            accessor: "ent_name"
          },
          {
            Header: "Post Code",
            accessor: "ent_postcode"
          },
          {
            Header: "PAYE Jobs",
            accessor: "PAYE_jobs",
            show: hideCol("PAYE_jobs")
          },
          {
            Header: "employees",
            accessor: "employees",
            show: hideCol("employees")
          },
          {
            Header: "Standard Vat Turnover",
            accessor: "standard_vat_turnover",
            show: hideCol("standard_vat_turnover")
          },
          {
            Header: "Contained Rep Vat Turnover",
            accessor: "contained_rep_vat_turnover",
            show: hideCol("contained_rep_vat_turnover")
          },
        ]}
        defaultPageSize={lessThanFive(results)}
        className="-striped -highlight"
      />
      <br />
    </div>
  );
};

SearchRefResultsTable.propTypes = {
  results: PropTypes.object.isRequired,
};

export default SearchRefResultsTable;

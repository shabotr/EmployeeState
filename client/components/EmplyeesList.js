import React from 'react';
let ReactBsTable  = require('react-bootstrap-table');
let BootstrapTable = ReactBsTable.BootstrapTable;
let TableHeaderColumn = ReactBsTable.TableHeaderColumn;

const EmplyeesList = (props) => {
    if(props.employees) {
        return (
            <BootstrapTable data={props.employees} search={ true }>
                <TableHeaderColumn isKey dataField='first_name'>First Name</TableHeaderColumn>
                <TableHeaderColumn dataField='last_name'>Last Name</TableHeaderColumn>
                <TableHeaderColumn dataField='status' dataSort>Status</TableHeaderColumn>
            </BootstrapTable>
        );
    } else {
        return (
            <div className="text-center">
                <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

};

export default EmplyeesList;
import React from 'react';
import { browserHistory } from 'react-router';

import EmployeeRow from './employeeRow';
import Spinner from './spinner';

const EmployeeList = (props) => {
  if (props.employees.loading) {
    return <Spinner />;
  }

  const employeeRows = props.employees.data.map(employee =>
    <EmployeeRow key={`employee-${employee.id}`} employee={employee} />
  );

  return (
    <div>
      <div className='mdl-list'>
        <div className='employee-list-header'>
          <div>
            <h3>Alle ansatte</h3>
          </div>
          <button
            onClick={() => browserHistory.push('/employees/new')}
            id='add-employee-button'
            className='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab'
          >
            <i className='material-icons dark-gray'>add</i>
          </button>
        </div>
        <hr />
        <div className='vert-spacer' />
        {employeeRows}
      </div>
    </div>
  );
};

EmployeeList.propTypes = {
  employees: React.PropTypes.object.isRequired
};

export default EmployeeList;
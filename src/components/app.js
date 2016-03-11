// @flow

import React from 'react';
import EmployeeList from './employeeList';

const App = (props) => {
  const listClasses = props.children === null
    ? 'mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet'
    : 'mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--hide-phone';

  return (
    <div className='mdl-grid'>
      <div className={listClasses}>
        <EmployeeList />
      </div>
      <div className='mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet'>
        <div className='detail-view'>
          {props.children}
        </div>
      </div>
    </div>
  );
};

App.propTypes = {
  children: React.PropTypes.object
};

export default App;

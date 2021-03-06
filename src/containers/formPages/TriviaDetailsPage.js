import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm, startSubmit, stopSubmit, destroy } from 'redux-form';
import regeneratorRuntime from 'regenerator-runtime';
import { updateEmployee, createEmployee } from '../../apiclient';
import { toggleEmployeeEditor, getEmployees, apiError } from '../../actions/index';

/* eslint no-unused-vars: 0 */
/* eslint no-unused-vars: 1 */

import { TextInput, InputLabel, TextArea } from './CustomFields';
import PagingAndSubmitControls from './PagingAndSubmitControls';

const TriviaDetialsPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-page-fields">
        <span className="form-page-fields__intro-text">Litt trivielle ting</span>
        <InputLabel labelText="Hvem er du?">
          <Field name="bio" component={TextArea} label={'?\n??\n???'} />
        </InputLabel>
        <InputLabel labelText="Din personlige emoji">
          <Field name="emoji" type="text" component={TextInput} label="🦐" />
        </InputLabel>
        <InputLabel labelText="Din personlige tittel">
          <Field name="title" type="text" component={TextInput} label="CEO? Snapchatter?" />
        </InputLabel>
      </div>
      <PagingAndSubmitControls previousPage={previousPage} isFormSubmit />
    </form>
  );
};

TriviaDetialsPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired
};

const onSuccessfulSubmit = async (result, dispatch) => {
  dispatch(getEmployees());
  dispatch(toggleEmployeeEditor());
  dispatch(stopSubmit('employeeForm'));
  dispatch(destroy('employeeForm'));
};

const onFailedSubmit = async (error, dispatch, submitError) => {
  if (submitError && submitError.status) {
    dispatch(apiError({ status: submitError.status, message: submitError.data.message }));
  }
};

const submitEmployeeForm = (employeeData, dispatch) => {
  dispatch(startSubmit('employeeForm'));

  if (employeeData.id) {
    const modifiedEmployeeData = { ...employeeData };
    delete modifiedEmployeeData.id;
    delete modifiedEmployeeData.customer_id;
    delete modifiedEmployeeData.customer_name;
    delete modifiedEmployeeData.customer_name;
    delete modifiedEmployeeData.cardColor;
    return updateEmployee(employeeData.id, modifiedEmployeeData);
  }

  return createEmployee(employeeData);
};

export default reduxForm({
  form: 'employeeForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: submitEmployeeForm,
  onSubmitSuccess: onSuccessfulSubmit,
  onSubmitFail: onFailedSubmit
})(TriviaDetialsPage);

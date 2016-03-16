// @flow

import { SELECT_EMPLOYEE } from '../actions/index';

export default (state = null, action) => {
  if (action.type === SELECT_EMPLOYEE) {
    return Object.assign({}, action.payload);
  }

  return state;
};
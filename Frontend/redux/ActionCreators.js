import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';



export const fetchComputers = () => (dispatch) => {

    dispatch(computersLoading());
    return fetch(baseUrl+"computers")
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(computers => dispatch(addComputers(computers)))
    .catch(error => dispatch(computersFailed(error.message)));
};

export const computersLoading = () => ({
    type: ActionTypes.COMPUTERS_LOADING
});

export const computersFailed = (errmess) => ({
    type: ActionTypes.COMPUTERS_FAILED,
    payload: errmess
});

export const addComputers = (computers) => ({
    type: ActionTypes.ADD_COMPUTERS,
    payload: computers
});


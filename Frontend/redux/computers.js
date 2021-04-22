import * as ActionTypes from './ActionTypes';

export const computers = (state = { isLoading: true,
                                 errMess: null,
                                 computers:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMPUTERS:
            return {...state, isLoading: false, errMess: null, computers: action.payload};

        case ActionTypes.COMPUTERS_LOADING:
            return {...state, isLoading: true, errMess: null, computers: []}

        case ActionTypes.COMPUTERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};
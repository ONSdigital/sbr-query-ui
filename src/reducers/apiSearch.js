import { SET_REF_RESULTS, SET_REF_HEADERS, SENDING_REF_REQUEST, SET_REF_QUERY, SET_REF_ERROR_MESSAGE, SET_REF_PERIOD, SET_REF_FILTER } from '../constants/ApiConstants';

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

// The initial application state
const initialState = {
  refSearch: {
    results: [],
    headers: [],
    query: '',
    period: "201706",
    currentlySending: false,
    errorMessage: '',
    filter: [],
  },
};
// Takes care of changing the application state
function refReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REF_RESULTS:
      return assign({}, state, {
        ...state,
        refSearch: {
          ...state.refSearch,
          results: action.newState.results,
        },
      });
    case SET_REF_HEADERS:
      return assign({}, state, {
        ...state,
        refSearch: {
          ...state.refSearch,
          headers: action.newState.headers,
        },
      });
    case SENDING_REF_REQUEST:
      return assign({}, state, {
        ...state,
        refSearch: {
          ...state.refSearch,
          currentlySending: action.sending,
        },
      });
    case SET_REF_QUERY:
      return assign({}, state, {
        ...state,
        refSearch: {
          ...state.refSearch,
          query: action.query,
        },
      });
    case SET_REF_FILTER:
      return assign({}, state, {
        ...state,
        refSearch: {
          ...state.refSearch,
          filter: action.filter,
        },
      });
    case SET_REF_ERROR_MESSAGE:
      return assign({}, state, {
        ...state,
        refSearch: {
          ...state.refSearch,
          errorMessage: action.message,
        },
      });
      case SET_REF_PERIOD:
        return assign({}, state, {
          ...state,
          refSearch: {
            ...state.refSearch,
            period: action.period,
          },
        });
    default:
      return state;
  }
}

export default refReducer;

import {
  ADD_BUG,
  DELETE_BUG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BUG,
  FILTER_BUGS,
  CLEAR_BUGS,
  CLEAR_FILTER,
  BUG_ERROR,
  GET_BUGS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_BUGS:
      return {
        ...state,
        bugs: action.payload,
        loading: false,
      };
    case ADD_BUG:
      return {
        ...state,
        bugs: [...state.bugs, action.payload],
        loading: false,
      };
    case DELETE_BUG:
      return {
        ...state,
        bugs: state.bugs.filter((bug) => bug._id !== action.payload),
        loading: false,
      };
    case UPDATE_BUG:
      return {
        ...state,
        bugs: state.bugs.map((bug) =>
          bug._id === action.payload._id ? action.payload : bug
        ),
        loading: false,
      };
    case CLEAR_BUGS:
      return {
        ...state,
        bugs: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_BUGS:
      return {
        ...state,
        filtered: state.bugs.filter((bug) => {
          const regEx = new RegExp(`${action.payload}`, 'gi');
          return bug.name.match(regEx);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case BUG_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

import { LOGIN_ACTION } from '../actions/actionTypes';
const initialState = {
  user: 'LovePets Redux'
};
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
}
import { loginReducer } from './loginReducer';
import { combineReducers } from 'redux';
export const Reducers = combineReducers({
  clickState: loginReducer
});
import { LOGIN_ACTION } from './actionTypes';
export const clickButton = value => ({
  type: LOGIN_ACTION,
  user: value
});
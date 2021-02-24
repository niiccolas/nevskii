import { combineReducers } from 'redux';
import cart from './cart/reducer';
import auth from './auth/reducer';
import user from './user/reducer';

/**
 * App Root reducer
 *
 */
export default combineReducers({
  cart,
  auth,
  user,
});

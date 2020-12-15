import { combineReducers } from 'redux';
import cart from './cart/reducer';

/**
 * App Root reducer
 *
 */
export default combineReducers({
  cart,
});

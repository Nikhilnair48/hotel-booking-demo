import { combineReducers } from 'redux';

import { booking } from './booking.reducer';
import { registration } from './registration.reducer';
import { authentication } from './authentication.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  booking
});

export default rootReducer;
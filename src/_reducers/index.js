import { combineReducers } from 'redux';

import { booking } from './booking.reducer';

const rootReducer = combineReducers({
  booking
});

export default rootReducer;
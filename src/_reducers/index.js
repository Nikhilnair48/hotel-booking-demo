import { combineReducers } from 'redux';

import { booking } from './booking.reducer';
import { registration } from './registration.reducer';
import { authentication } from './authentication.reducer';
import storage from 'redux-persist/lib/storage';

import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: storage,
  timeout: null
}

const rootReducer = combineReducers({
  authentication,
  registration,
  booking
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer;
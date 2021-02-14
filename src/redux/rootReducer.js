import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import darkModeReducer from './slices/dark-mode';
// import userReducer from './slices/user';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  keyPrefix: 'redux-',
  version: 1,
  whitelist: ['theme']
};

const productPersistConfig = {
  key: 'product',
  storage: storage,
  keyPrefix: 'redux-',
  blacklist: ['isLoading', 'error', 'products', 'product', 'filters']
};

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  theme: darkModeReducer,
  calendar: calendarReducer,
  mail: mailReducer,
  chat: chatReducer,
  blog: blogReducer,
  product: persistReducer(productPersistConfig, productReducer),
  user: userReducer,
  notifications: notificationsReducer
});

export { rootPersistConfig, rootReducer };

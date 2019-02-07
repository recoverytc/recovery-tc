import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import myEventsSaga from './myEventsSaga';
import eventListSaga from './eventListSaga';
import userListSaga from './userListSaga';
import attendeesListSaga from './attendeesListSaga';
import thisEventSaga from './thisEventSaga';
import eventFormSaga from './eventFormSaga';
import attendingThisSaga from './attendingThisSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    myEventsSaga(),
    eventListSaga(),
    userListSaga(),
    attendeesListSaga(),
    thisEventSaga(),
    eventFormSaga(),
    attendingThisSaga(),
  ]);
}

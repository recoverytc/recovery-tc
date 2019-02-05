import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchEventList() {
  try {
    const response = yield axios.get('api/eventList');
    yield put({ type: 'SET_EVENT_LIST', payload: response.data });
  } catch (error) {
    console.log( 'get event list request failed', error);
  }
}


function* fetchAdminEventList() {
  try {
    const response = yield axios.get('api/admin/eventList');
    yield put({ type: 'SET_ADMIN_EVENT_LIST', payload: response.data });
  } catch (error) {
    console.log( 'get admin event list request failed', error);
  }
}


function* eventListSaga() {
  yield takeLatest('FETCH_EVENT_LIST', fetchEventList);
  yield takeLatest('FETCH_ADMIN_EVENT_LIST', fetchAdminEventList);
}

export default eventListSaga;

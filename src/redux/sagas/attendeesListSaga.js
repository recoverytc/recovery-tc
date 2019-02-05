import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAttendeesList(action) {
  try {
    const attendeesResponse = yield axios.get(`api/admin/attendees${action.payload}`);
    yield put({ type: 'SET_ATTENDEES_LIST', payload: attendeesResponse.data });
  } catch (error) {
    console.log( 'get attendees list request failed', error);
  }
}

function* attendeesListSaga() {
  yield takeLatest('FETCH_ATTENDEES_LIST', fetchAttendeesList);
}

export default attendeesListSaga;
import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_ATTENDEES_LIST" actions
function* fetchAttendeesList(action) {
  try {
      // console.log(action.payload);
    const attendeesResponse = yield call(axios.get, `api/admin/attendees/${action.payload}`);
    yield put({ type: 'SET_ATTENDEES_LIST', payload: attendeesResponse.data }); //to attendeesListReducer
  } catch (error) {
    console.log( 'get attendees list request failed', error);
  }
}// end fetchAttendeesList

function* attendeesListSaga() {
  yield takeLatest('FETCH_ATTENDEES_LIST', fetchAttendeesList); //from AdminEventAttendeesPage
}

export default attendeesListSaga;
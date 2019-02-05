import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchCaptainProfile(action) {
  try {
    const response = yield axios.get(`api/captain/profile/${action.payload}`);
    yield put({ type: 'SET_CAPTAIN_PROFILE', payload: response.data });
  } catch (error) {
    console.log( 'get captain profile request failed', error);
  }
}

function* captainProfileSaga() {
  yield takeLatest('FETCH_CAPTAIN_PROFILE', fetchCaptainProfile);
}

export default captainProfileSaga;
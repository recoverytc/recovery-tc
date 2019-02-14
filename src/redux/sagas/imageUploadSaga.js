import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* postImageS3(action) {
  try {
    const response = yield axios.post('api/imageUpload', action.payload);
    // yield put({ type: 'SET_EVENT_LIST', payload: response.data });
  } catch (error) {
    console.log( 'Post image to S3 request failed', error);
  }
}


function* eventListSaga() {
  yield takeLatest('POST_IMAGE_S3', postImageS3);
}

export default eventListSaga;
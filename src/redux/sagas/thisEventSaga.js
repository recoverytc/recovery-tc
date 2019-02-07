import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchThisEvent(action) {
    try {

        // the config includes credentials which
        // allow the server session to recognize the user
        // If a user is logged in, this will return their information
        // from the server session (req.user)
        const response = yield axios.get(`api/thisEvent/${action.refresh}`);

        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'SET_THIS_EVENT', payload: response.data[0] });
    } catch (error) {
        console.log('This Event get request failed', error);
    }
}// end fetchThisEvent

function* thisEventSaga() {
    yield takeLatest('FETCH_THIS_EVENT', fetchThisEvent)

}

export default thisEventSaga;
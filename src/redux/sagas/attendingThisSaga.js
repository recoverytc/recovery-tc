import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_ATTENDING_THIS_EVENT" actions
function* fetchAttendingThisEvent(action) {
    try {

        //get "attending" from event_user table to determine which button to 
        //render on EventPage (Attend or Cancel)
        const response = yield axios.get(`api/thisEvent/isAttending/${action.refresh}`);

        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        if (response.data[0] === undefined){
            yield put({ type: 'SET_NOT_ATTENDING_THIS_EVENT' }); //to attendingThisReducer
        } else {
            yield put({ type: 'SET_ATTENDING_THIS_EVENT', payload: response.data[0] }); //to attendingThisReducer
        }
    } catch (error) {
        console.log('This Event get request failed', error);
    }
}// end fetchAttendingThisEvent

function* attendingThisSaga() {
    yield takeLatest('FETCH_ATTENDING_THIS_EVENT', fetchAttendingThisEvent) //from EventPage

}

export default attendingThisSaga;
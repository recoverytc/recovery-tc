import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "DELETE_FROM_MY_EVENTS" actions
function* deleteFromMyEvents(action) {
    console.log('in deleteFromMyEvents, action', action);
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // the config includes credentials which
        // allow the server session to recognize the user
        // If a user is logged in, this will return their information
        // from the server session (req.user)
        yield axios.delete(`api/myEvents/${action.payload.event_id}/${action.payload.user_id}`, config);

        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'FETCH_MY_EVENTS', refresh: action.refresh });
    } catch (error) {
        console.log('Delete from my events request failed', error);
    }
}//end deleteFromMyEvents

// worker Saga: will be fired on "FETCH_MY_EVENTS" actions
function* fetchMyEvents(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // the config includes credentials which
        // allow the server session to recognize the user
        // If a user is logged in, this will return their information
        // from the server session (req.user)
        const response = yield axios.get(`api/myEvents/myevents?id=${action.refresh}`, config);
        // const response = yield axios.get(`api/myEvents`, config);
 
        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'SET_MY_EVENTS', payload: response.data });
    } catch (error) {
        console.log('My Events get request failed', error);
    }
}

function* myEventsSaga() {
    yield takeLatest('FETCH_MY_EVENTS', fetchMyEvents)
    yield takeLatest('DELETE_FROM_MY_EVENTS', deleteFromMyEvents)

}

export default myEventsSaga;
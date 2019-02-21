import axios from 'axios';
import { put, takeLatest , call} from 'redux-saga/effects';

// worker Saga: will be fired on "ADD_TO_MY_EVENTS" actions
function* addToMyEvents(action) {
    console.log('in deleteFromMyEvents, action', action);
    try {
        yield axios.post( '/api/myEvents/addevent', action.payload)
        yield put({ type: 'FETCH_THIS_EVENT', refresh: action.refresh.event_id }); //to thisEventSaga
        yield put({ type: 'FETCH_ATTENDING_THIS_EVENT', refresh: action.refresh.event_id }); //to attendingThisSaga   
    } catch (error) {
        console.log('Delete from my events request failed', error);
    }
}//end addToMyEvents function

// worker Saga: will be fired on "DELETE_FROM_MY_EVENTS" actions
function* deleteFromMyEvents(action) {
    console.log('in deleteFromMyEvents, action', action);
    try {
        yield axios.delete(`api/myEvents/${action.payload.event_id}/${action.payload.user_id}`);
        yield put({ type: 'FETCH_MY_EVENTS', refresh: action.refresh.user_id }); //to myEventsSaga
    } catch (error) {
        console.log('Delete from my events request failed', error);
    }
}//end deleteFromMyEvents function

// worker Saga: will be fired on "DELETE_FROM_THIS_EVENT" actions
function* deleteFromThisEvent(action) {
    console.log('in deleteFromThisEvent, action', action);
    try {
        yield axios.delete(`api/myEvents/${action.payload.event_id}/${action.payload.user_id}`);
        yield put({ type: 'FETCH_MY_EVENTS', refresh: action.refresh.user_id }); //to myEventsSaga
        yield put({ type: 'FETCH_THIS_EVENT', refresh: action.refresh.event_id }); //to thisEventSaga
        yield put({ type: 'FETCH_ATTENDING_THIS_EVENT', refresh: action.refresh.event_id }); //to attendingThisSaga
    } catch (error) {
        console.log('Delete from my events request failed', error);
    }
}//end deleteFromThisEvent function

// worker Saga: will be fired on "FETCH_MY_EVENTS" actions
function* fetchMyEvents(action) {
    try {
        const response = yield axios.get(`api/myEvents/myevents?id=${action.refresh}`);
        yield put({ type: 'SET_MY_EVENTS', payload: response.data }); //to myEventsReducer
    } catch (error) {
        console.log('My Events get request failed', error);
    }
}// end fetchMyEvents function

// worker Saga: will be fired on "EDIT_EVENT" actions
function* editEvent(action){
    try{
        yield call (axios.put , '/api/captain/edit/event' , action.payload)
        yield put({ type: 'FETCH_EVENT_LIST'}); //to eventListSaga
    }catch(error){
        console.log('error in edit saga' , error);  
    }
}// end editEvent function

// worker Saga: will be fired on "UPDATE_FEEDBACK" actions
function* updateRating(action){
    try {
        console.log('action.payload in saga', action.payload);
        yield call(axios.put, `/api/myEvents/feedback`, action.payload)
    }
    catch (error){
        console.log('error in adding rating saga' , error);
    }
}// end updateRating function

function* myEventsSaga() {
    yield takeLatest('FETCH_MY_EVENTS', fetchMyEvents) //from MyEventList
    yield takeLatest('DELETE_FROM_MY_EVENTS', deleteFromMyEvents) //from MyEventCard
    yield takeLatest('DELETE_FROM_THIS_EVENT', deleteFromThisEvent) //from EventPage
    yield takeLatest('ADD_TO_MY_EVENTS', addToMyEvents) //from EventPage
    yield takeLatest('EDIT_EVENT' , editEvent) //from CaptainProfilePage
    yield takeLatest('UPDATE_FEEDBACK', updateRating) // from EventPage
}

export default myEventsSaga;

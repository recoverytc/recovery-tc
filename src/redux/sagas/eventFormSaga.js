import axios from 'axios'
import {put , call , takeEvery} from 'redux-saga/effects'


function* addEvent(action){
    try{
     yield call(axios.post , 'api/captain/addevent' , action.payload)
    }catch(error){
        console.log('error in add event saga' , error);
        
    }
}

//cancels event, sends text notification in the router, then fires the delete
function* cancelEvent(action) {
    try {
        yield call(axios.get, `api/captain/cancel/${action.payload.id}`);
        yield put({ type: 'DELETE_CANCELLED_EVENT', payload: action.payload.id  });


    } catch (error) {
        console.log('error in cancel event saga', error);

    }
}

//deletes the cancelled event after the texts have been queued
function* deleteCancelledEvent(action) {
    console.log('in deleteCancelledEvent');
    
    try{
        yield call(axios.delete, `api/captain/delete/${action.payload}`);
        yield put({ type: 'FETCH_EVENT_LIST' });

    } catch (error) {
        console.log('error in delete cancelled event saga', error);
    }
}// end deleteCancelledEvent


function* eventFormSaga() {
    yield takeEvery('ADD_EVENT', addEvent); //from EventForm
    yield takeEvery('CANCEL_EVENT', cancelEvent); //from CaptainProfilePage
    yield takeEvery('DELETE_CANCELLED_EVENT', deleteCancelledEvent)
  }
  
  export default eventFormSaga;
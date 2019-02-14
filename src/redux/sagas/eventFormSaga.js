import axios from 'axios'
import {put as dispatch , call , takeEvery} from 'redux-saga/effects'


function* addEvent(action){
    try{
     yield call(axios.post , 'api/captain/addevent' , action.payload)
    }catch(error){
        console.log('error in add event saga' , error);
        
    }
}

function* cancelEvent(action) {
    try {
        yield call(axios.post, `api/captain/cancelevent/${action.payload.event_id}`, action.payload)
    } catch (error) {
        console.log('error in cancel event saga', error);

    }
}


function* eventFormSaga() {
    yield takeEvery('ADD_EVENT', addEvent); //from EventForm
    yield takeEvery('CANCEL_EVENT', cancelEvent); //from CaptainProfilePage
  }
  
  export default eventFormSaga;
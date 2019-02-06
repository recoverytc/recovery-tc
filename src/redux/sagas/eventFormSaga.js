import axios from 'axios'
import {put as dispatch , call , takeEvery} from 'redux-saga/effects'


function* addEvent(action){
    try{
     yield call(axios.post , '/api/captain/addevent' , action.payload)
    }catch(error){
        console.log('error in add event saga' , error);
        
    }
}





function* eventFormSaga() {
    yield takeEvery('ADD_EVENT', addEvent);
  }
  
  export default eventFormSaga;
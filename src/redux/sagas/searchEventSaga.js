import axios from 'axios'
import {put as dispatch , call , takeEvery} from 'redux-saga/effects'


function* searchEvent(action){
    try{
    const getResponse = yield call(axios.get , `/api/eventList/searchevent/${action.payload}` , )
     yield dispatch({type: 'SET_SEARCH_LIST' , payload: getResponse.data })

    }catch(error){
        console.log('search event saga' , error);
        
    }
}





function* searchEventSaga() {
    yield takeEvery('SEARCH_EVENT', searchEvent);
  }
  
  export default searchEventSaga;
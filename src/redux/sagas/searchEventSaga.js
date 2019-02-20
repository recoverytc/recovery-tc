import axios from 'axios'
import {put as dispatch , call , takeEvery} from 'redux-saga/effects'

// worker Saga: will be fired on "SEARCH_EVENT" actions
function* searchEvent(action){
    try{
    const getResponse = yield call(axios.get , `/api/eventList/searchevent/${action.payload}` , )
     yield dispatch({type: 'SET_SEARCH_LIST' , payload: getResponse.data }) //to searchListReducer
    }catch(error){
        console.log('search event saga' , error);
    }
}//end searchEvent

function* searchEventSaga() {
    yield takeEvery('SEARCH_EVENT', searchEvent); //from SearchBar
  }
  
  export default searchEventSaga;
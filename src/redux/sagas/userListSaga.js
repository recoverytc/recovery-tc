import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_ALL_USERS" actions
function* fetchAllUsers() {
    try {
        const userListResponse = yield call(axios.get, '/api/admin/getUsers');
        yield put({type: 'SET_ALL_USERS', payload: userListResponse.data}) //to userListReducer
    } catch(err) {
        console.log('Error getting users in userListSaga:', err);
    }
}// end fetchAllUsers function

// worker Saga: will be fired on "CHANGE_CAPTAIN_STATUS" actions
function* changeCaptainStatus(action) {
    try {
        yield call(axios.put, `/api/admin/changeCaptainStatus`, action.payload);
        yield put({type: 'FETCH_ALL_USERS'}); 
    } catch(err) {
        console.log('Error changing captain status in userListSaga:', err);
    }
}// end changeCaptainStatus function

// worker Saga: will be fired on "CHANGE_ACTIVE_STATUS" actions
function* changeActiveStatus(action) {
    try {
        yield call(axios.put, `/api/admin/changeActiveStatus`, action.payload);
        yield put({type: 'FETCH_ALL_USERS'}); 
    } catch(err) {
        console.log('Error changing active status in userListSaga:', err);
    }
}// end changeActiveStatus function

function* userListSaga() {
    yield takeLatest('FETCH_ALL_USERS', fetchAllUsers); //from AdminUsersPage
    yield takeLatest('CHANGE_CAPTAIN_STATUS', changeCaptainStatus); //from AdminUsersPage
    yield takeLatest('CHANGE_ACTIVE_STATUS', changeActiveStatus); //from AdminUsersPage
}

export default userListSaga;
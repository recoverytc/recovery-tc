import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

function* fetchAllUsers() {
    try {
        const userListResponse = yield call(axios.get, '/api/admin/getUsers');
        yield put({type: 'SET_ALL_USERS', payload: userListResponse.data})
    } catch(err) {
        console.log('Error getting users in userListSaga:', err);
    }
}

function* changeCaptainStatus(action) {
    try {
        yield call(axios.put, `/api/admin/changeCaptainStatus`, action.payload);
        yield put({type: 'FETCH_ALL_USERS'});
    } catch(err) {
        console.log('Error changing captain status in userListSaga:', err);
    }
}

function* changeActiveStatus(action) {
    try {
        yield call(axios.put, `/api/admin/changeActiveStatus`, action.payload);
        yield put({type: 'FETCH_ALL_USERS'});
    } catch(err) {
        console.log('Error changing active status in userListSaga:', err);
    }
}

function* userListSaga() {
    yield takeLatest('FETCH_ALL_USERS', fetchAllUsers);
    yield takeLatest('CHANGE_CAPTAIN_STATUS', changeCaptainStatus);
    yield takeLatest('CHANGE_ACTIVE_STATUS', changeActiveStatus);
}

export default userListSaga;
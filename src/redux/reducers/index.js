import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import myEvents from './myEventsReducer';
import eventList from './eventListReducer';
import userList from './userListReducer';
import attendeesList from './attendeesListReducer';
import thisEvent from './thisEventReducer';
import attendingThis from './attendingThisReducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  myEvents, // will be a list of events a user has signed up for
  eventList, // will have an id and username if someone is logged in
  userList,
  attendeesList,
  thisEvent,
  attendingThis,
});

export default rootReducer;

import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_LOGIN_ERROR': //from loginSaga
      return '';
    case 'LOGIN_INPUT_ERROR': //from LoginPage
      return 'Enter your username and password!';
    case 'LOGIN_FAILED': //from loginSaga
      return 'Oops! The username and password didn\'t match. Try again!';
    case 'LOGIN_FAILED_NO_CODE': //from loginSaga
      return 'Oops! Something went wrong! Is the server running?';
    case 'LOGIN_ACCOUNT_ERROR': ////////////////////////////////////////////
      return 'Sorry, Your account has been deactivated';
    default:
      return state;
  }
}; //end loginMessage

// registrationMessage holds the string that will display
// on the registration screen if there's an error
// from RegisterPage
const registrationMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_REGISTRATION_ERROR': //from registrationSaga
      return '';
    case 'REGISTRATION_INPUT_ERROR': //from RegisterPage
      return 'Choose a username and password!';
    case 'REGISTRATION_FAILED': //from registrationSaga
      return 'Oops! That didn\'t work. The username might already be taken. Try again!';
    case 'REGISTRATION_PHONE_ERROR': //from RegisterPage
      return 'Please enter a valid phone number.';
    case 'REGISTRATION_PASSWORD_ERROR': //from RegisterPage
      return 'The entered passwords do not match! Try again.';
      default:
      return state;
  }
};//end registrationMessage

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
});

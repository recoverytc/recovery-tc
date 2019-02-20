const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER': //from loginSaga, or userSaga
      return action.payload;
    case 'UNSET_USER': //from loginSaga
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;

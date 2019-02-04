const userListReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_USERS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // userList will be on the redux state at:
  // state.userList
  export default userListReducer;
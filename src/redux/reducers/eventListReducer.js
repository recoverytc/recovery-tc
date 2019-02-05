const eList = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENT_LIST':
      return action.payload;
    case 'SET_ADMIN_EVENT_LIST':
      return action.payload;
    default:
      return state;
  }
};
// loginMode will be on the redux state at:
// state.loginMode
export default eList;

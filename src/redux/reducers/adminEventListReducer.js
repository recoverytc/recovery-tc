const adminEventList = (state = [], action) => {
  switch (action.type) {

    case 'SET_ADMIN_EVENT_LIST': //
      return action.payload;
    default:
      return state;
  }
};
// will be on the redux state at:
// state.adminEventList
export default adminEventList;

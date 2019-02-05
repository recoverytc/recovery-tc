const attendeesList = (state = [], action) => {
    switch (action.type) {
      case 'SET_ATTENDEES_LIST':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default attendeesList;
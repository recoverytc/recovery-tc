const searchList = (state = [], action) => {
    switch (action.type) {
      case 'SET_SEARCH_LIST': //from searchEventSaga
        return action.payload;
      default:
        return state;
    }
  };
  
  export default searchList;
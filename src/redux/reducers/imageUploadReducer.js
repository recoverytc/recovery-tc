
const imageFile = (state = [], action) => {
    switch (action.type) {
      case 'SET_EVENT_LIST':
        return action.payload;
      default:
        return state;
    }
  };

  export default imageFile;
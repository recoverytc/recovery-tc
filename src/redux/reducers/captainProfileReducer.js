const captainProfile = (state = [], action) => {
  switch (action.type) {
    case 'SET_CAPTAIN_PROFILE':
      return action.payload;
    default:
      return state;
  }
};

export default captainProfile;
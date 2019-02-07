const attendingThisReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ATTENDING_THIS_EVENT':
            return action.payload;
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.attendingThis
export default attendingThisReducer;
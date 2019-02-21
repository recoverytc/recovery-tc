let initialState = {
    id: null,
    event_id: null,
    user_id: null,
    feedback: null,
    comment: null,
    rating: null,
    attending: false,
}

const attendingThisReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ATTENDING_THIS_EVENT': //from attendingThisSaga
            return action.payload;
        case 'SET_NOT_ATTENDING_THIS_EVENT': //from attendingThisSaga
            return initialState;
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.attendingThis
export default attendingThisReducer;
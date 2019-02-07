let initialState = {
    id: null,
    title: null,
    date: null,
    time: null, 
    address: null,
    description: null,
    feature: null,
    carousel: null,
    image: null,
    captain_id: null,
    capacity: null,
    attendee: null,
    venue: null
}

const thisEventReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_THIS_EVENT':
            return action.payload;
        default:
            return state;
    }
};


// loginMode will be on the redux state at:
// state.thisEvent
export default thisEventReducer;
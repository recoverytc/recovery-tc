const myEventsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MY_EVENTS':
            return action.payload;
        default:
            return state;
    }
};

// calendar will be on the redux state at:
// state.myEvents
export default myEventsReducer;
const thisEventReducer = (state = [], action) => {
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
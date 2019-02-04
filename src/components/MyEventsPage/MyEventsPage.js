import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyEventsPage extends Component {

    componentDidMount() {
        this.getMyEvents();
    }

    getMyEvents() {
        // console.log('getMyEvents');
        this.props.dispatch({
            type: 'FETCH_MY_EVENTS',
            refresh: this.props.reduxStore.user.id
        });
    }//end getMyEvents

    render() {
        return (
            <div>
                {/* <p> {JSON.stringify({this.props.reduxStore.myEvents})} </p> */}
                <h3>My Events</h3>

            </div>
        )
    }
}


const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(MyEventsPage);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyEventList from './MyEventList/MyEventList';
import './MyEventsPage.css';

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
            <div className="myevents-container">
                {/* <p> {JSON.stringify({this.props.reduxStore.myEvents})} </p> */}
                <h1 className="myevents-title">My Events</h1>
                <MyEventList/>

            </div>
        )
    }
}


const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(MyEventsPage);
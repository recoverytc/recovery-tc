import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import './EventPage.css';
import attendingThisSaga from '../../redux/sagas/attendingThisSaga';


class EventPage extends Component {

    componentDidMount() {
        this.getThisEvent();
        this.getAttendingThis();
    }

    getThisEvent() {
        // console.log('getThisEvent');
        this.props.dispatch({
            type: 'FETCH_THIS_EVENT',
            refresh: this.props.match.params.id
        });
    }//end getThisEvent

    getAttendingThis() {
        // console.log('getAttendingThis');
        this.props.dispatch({
            type: 'FETCH_ATTENDING_THIS_EVENT',
            refresh: this.props.match.params.id
        });
    }//end getAttendingThis

    addToMyEvents = () => {
        this.props.dispatch({
            type: 'ADD_TO_MY_EVENTS',
            payload: {
                event_id: this.props.event.id,
                user_id: this.props.reduxStore.user.id,
            },
            refresh: this.props.reduxStore.user.id
        })
    };

    deleteFromMyEvents = () => {
        this.props.dispatch({
            type: 'DELETE_FROM_MY_EVENTS',
            payload: {
                event_id: this.props.event.id,
                user_id: this.props.reduxStore.user.id,
            },
            refresh: this.props.reduxStore.user.id
        })
    };

    render(){
        console.log("this.props.reduxStore.thisEvent", this.props.thisEvent[0]);
        console.log("this.props.attendingThis", this.props.attendingThis);

        
        

        let display = this.props.thisEvent.map(event => {

            return (
                <div>
                <h1>{event.title}</h1>
                    <img src={event.image} alt="picture" className="image-url" />
                    <h5>{event.venue}</h5>
                    <p>{event.address}</p>
                    <p>{event.date}</p>
                    <p>{event.time}</p>
                    <p>{event.description}</p>
                    <p>{event.attendee} going </p>
                    <p>of a possible {event.capacity}</p>

                </div>
            )

        })

        let buttonDisplay = 'Attend';


        let displayButton = this.props.attendingThis.map(attending => {


            if (attending.attending === true && attending.feedback === false) {
                buttonDisplay = 'Cancel';
            } 


            return (
                <div>
                    
                </div>
            )
        })

        return(
            <div>
                {display}
                <Button onClick={this.addToMyEvents}>
                    {buttonDisplay}
                </Button>
            </div>
        )
    }
}
const mapStateToProps = state =>({
    thisEvent: state.thisEvent,
    user: state.user,
    attendingThis: state.attendingThis,
})

export default connect(mapStateToProps)(EventPage)
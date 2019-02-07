import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './EventPage.css';

const styles = theme =>({
    root : {
        [theme.breakpoints.up('xs')]: {
        backgroundColor: 'yellow',
        }
    },
    imageUrl : {
        maxWidth: 400
    }
})

class EventPage extends Component {

    componentDidMount() {
        this.getThisEvent();
    }

    getThisEvent() {
        // console.log('getThisEvent');
        this.props.dispatch({
            type: 'FETCH_THIS_EVENT',
            refresh: this.props.match.params.id
        });
    }//end getThisEvent

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
        
        const {classes}=this.props

        let display = this.props.thisEvent.map(event => {
            return (
                <div>
                <h1>{event.title}</h1>
                    <img src={event.image} alt="picture" className={classes.imageUrl} />
                    <h5>{event.venue}</h5>
                    <p>{event.address}</p>
                    <p>{event.date}</p>
                    <p>{event.time}</p>
                    <p>{event.description}</p>
                    <p>{event.attendee} going </p>
                    <p>of a possible {event.capacity}</p>

                <Button onClick={this.addToMyEvents}>
                    Attend
                </Button>
                <Button onClick={this.deleteFromMyEvents}>
                    Cancel
                </Button>
                </div>
            )

        })

        return(
            <div>
                {display}
            </div>
        )
    }
}
const mapStateToProps = state =>({
    thisEvent: state.thisEvent
})

export default connect(mapStateToProps)(withStyles(styles)(EventPage))
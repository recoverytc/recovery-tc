import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import './EventPage.css';
import attendingThisSaga from '../../redux/sagas/attendingThisSaga';
import moment from 'moment';


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

    HandleEvents = (type) => {
        if (type === 'Attend'){  //add this user to this event
            this.props.dispatch({
                type: 'ADD_TO_MY_EVENTS',
                payload: {
                    event_id: this.props.event.id,
                    user_id: this.props.reduxStore.user.id,
                },
                refresh: this.props.reduxStore.user.id
            })
        } else if (type === 'Cancel'){ //remove this user from this event
            this.props.dispatch({
                type: 'DELETE_FROM_MY_EVENTS',
                payload: {
                    event_id: this.props.event.id,
                    user_id: this.props.reduxStore.user.id,
                },
                refresh: this.props.reduxStore.user.id
            })
        } else if (type === 'Feedback'){

                //FEEDBACK HANDLER HERE
            // this.props.dispatch({
            //     type: 'ADD_RATING',
            //     payload:
            // })

        }



    };

    render(){
        console.log("this.props.reduxStore.thisEvent", this.props.reduxStore.thisEvent);

            return (
                <div>
                <h1>{this.props.reduxStore.thisEvent.title}</h1>
                    <img src={this.props.reduxStore.thisEvent.image} alt="picture" className="image-url" />
                    <h5>{this.props.reduxStore.thisEvent.venue}</h5>
                    <p>{this.props.reduxStore.thisEvent.address}</p>
                    <p>{moment(this.props.reduxStore.thisEvent.date).format("MMM Do YYYY")}</p>
                    <p>{moment(this.props.reduxStore.thisEvent.time, "HH:mm").format("hh:mm A")}</p>
                    <p>{this.props.reduxStore.thisEvent.description}</p>
                    <p>{this.props.reduxStore.thisEvent.attendee} going </p>
                    <p>of a possible {this.props.reduxStore.thisEvent.capacity}</p>

                </div>
            )



        let buttonDisplay = 'Attend';


        let displayButton = this.props.attendingThis.map(attending => {
            console.log();
            

            if (attending.attending === true  
                && moment(this.props.thisEvent.date).format("MMM Do YYYY") > moment()
        ) {
                buttonDisplay = 'Cancel';
            } 

            return (
                <div>
                    
                </div>
            )
        })

        return(
            <div>
                <Button onClick={ ()=> this.HandleEvents(buttonDisplay)}>
                    {buttonDisplay}
                </Button>
            </div>
        )
    }
}
const mapStateToProps = reduxStore =>({
    reduxStore
})

export default connect(mapStateToProps)(EventPage)
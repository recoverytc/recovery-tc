import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EventPage.css';
import moment from 'moment';
import { Dialog, DialogTitle, TextField, Button } from '@material-ui/core';
import StarRatingComponent from 'react-star-rating-component';



class EventPage extends Component {

    state = {
        open: false,
        feedback: true,
        rating: 0,
        comment: '',
        id: this.props.reduxStore.thisEvent.id
    }


    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleChange = (propertyName) => (event) => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value
        })
        console.log(this.state.comment)
    }

    handleSubmit = () => {
        this.props.dispatch({ type: 'UPDATE_FEEDBACK', payload: this.state })
        this.handleClose();
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
      }

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
        if (type === 'Attend') {  //add this user to this event
            this.props.dispatch({
                type: 'ADD_TO_MY_EVENTS',
                payload: {
                    event_id: this.props.reduxStore.thisEvent.id,
                    user_id: this.props.reduxStore.user.id,
                },
                refresh: {
                    user_id: this.props.reduxStore.user.id,
                    event_id: this.props.reduxStore.thisEvent.id,
                }
            })
        } else if (type === 'Cancel') { //remove this user from this event
            this.props.dispatch({
                type: 'DELETE_FROM_MY_EVENTS',
                payload: {
                    event_id: this.props.reduxStore.thisEvent.id,
                    user_id: this.props.reduxStore.user.id,
                },
                refresh: {
                    user_id: this.props.reduxStore.user.id,
                    event_id: this.props.reduxStore.thisEvent.id,
                }
            })
        } else if (type === 'Feedback') {
            this.setState({
                open: true
            })
            //FEEDBACK HANDLER HERE

        }
    };

    render() {
        console.log("eventdate", moment(this.props.reduxStore.thisEvent.date).format('YYYYDDD'));
        console.log("now", moment().format('YYYYDDD'));
        console.log("nowMinus7", moment().subtract(7, 'days').format('YYYYDDD'));

        let eventDate = moment(this.props.reduxStore.thisEvent.date).format('YYYYDDD');
        let now = moment().format('YYYYDDD');
        let nowMinus7 = moment().subtract(7, 'days').format('YYYYDDD');
        let attending = this.props.reduxStore.attendingThis.attending;
        let feedback = this.props.reduxStore.attendingThis.feedback;
        let buttonDisplay;

        // Not attending, button to 'Attend' displays
        if (attending === false && eventDate >= now) {
            buttonDisplay =
                <Button onClick={() => this.HandleEvents('Attend')}>
                    Attend
            </Button>
        // Attending a future event
        } else if (attending === true && eventDate >= now ) {
            buttonDisplay =
                <Button onClick={() => this.HandleEvents('Cancel')}>
                    Cancel
            </Button>
            // Attended a past event, but haven't left feedback    
        } else if (attending === true && eventDate >= nowMinus7 && feedback === false) {
            buttonDisplay =
                <Button onClick={() => this.HandleEvents('Feedback')}>
                    Feedback
            </Button>
            // Attended a past event, but haven't left feedback
        } else if (attending === true && eventDate < now && feedback === false) {
            buttonDisplay = ''

            // Event is in the past, and feedback is done
        } else {
            buttonDisplay = 'Monkeys'
        }


        return (
            <div className="eventpage-container">
                <h1>{this.props.reduxStore.thisEvent.title}</h1>
                <img src={this.props.reduxStore.thisEvent.image} alt="picture" className="image-url" />
                <h5>{this.props.reduxStore.thisEvent.venue}</h5>
                <p>{this.props.reduxStore.thisEvent.address}</p>
                <p>{moment(this.props.reduxStore.thisEvent.date).format("MMM Do YYYY")}</p>
                <p>{moment(this.props.reduxStore.thisEvent.time, "HH:mm").format("hh:mm A")}</p>
                <p>{this.props.reduxStore.thisEvent.description}</p>
                <p>{this.props.reduxStore.thisEvent.attendee} going </p>
                <p>of a possible {this.props.reduxStore.thisEvent.capacity}</p>

                {buttonDisplay}

                <div>
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="simple-dialog-title" >
                        <DialogTitle id="simple-dialog-title">Feedback</DialogTitle>

                        <form>

                            {/* Star rating */}
                            <StarRatingComponent 
                                name="rating"
                                starCount={5}
                                value={this.state.rating}
                                onStarClick={this.onStarClick.bind(this)} />
                            {/* comments */}
                            <TextField
                                label="comments"
                                multiline
                                rows="5"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                value={this.state.comment}
                                name="comment"
                                onChange={this.handleChange('comment')}
                            />
                        </form>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}>submit</Button>
                    </Dialog>
                </div>

            </div>
        )

    }
}

const mapStateToProps = reduxStore => ({
    reduxStore
})


export default connect(mapStateToProps)(EventPage)
import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Dialog, DialogTitle, TextField, Button } from '@material-ui/core';
import StarRatingComponent from 'react-star-rating-component';
import './MyEventCard.css';



const styles = theme => ({

});




class MyEventCard extends React.Component {

    state = {
        open: false,
        feedback: true,
        rating: 0,
        comment: '',
        id: this.props.event.id
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
        // console.log(this.state.comment) 
    }

    handleSubmit = () => {
        this.props.dispatch({ type: 'UPDATE_FEEDBACK', payload: this.state })
        this.handleClose();
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }

    HandleEvents = (type) => {
        if (type === 'Cancel') { //remove this user from this event
            this.props.dispatch({
                type: 'DELETE_FROM_MY_EVENTS',
                payload: {
                    event_id: this.props.event.id,
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

        const { classes, event } = this.props;

        let nowMinus7 = moment().subtract(7, 'days').format('YYYYDDD');
        let now = moment().format('YYYYDDD');
        let eventDate = moment(event.date).format('YYYYDDD');
        let buttonDisplay;

        if (eventDate >= now) {
            buttonDisplay =
                <Button className="myevents-delete" onClick={() => this.HandleEvents('Cancel')}>
                    Cancel
                </Button>
        } else if (eventDate >= nowMinus7) {
            buttonDisplay =
                <Button className="myevents-delete" onClick={() => this.HandleEvents('Feedback')}>
                    Feedback
                </Button>
        } else {
            buttonDisplay =
                'monkeys'

        }


        return (
            <div>
                <div className="root">
                    <Link to={`/events/${event.id}`}>
                        <div className="event-data">
                            <h2>{event.title}</h2>
                            <p>{moment(event.date).format("MMM Do YYYY")}</p>
                            <p>{moment(event.time, "HH:mm").format("hh:mm A")}</p>
                        </div>
                        <div>
                            <p className="attendees">{event.attendee}</p>
                        </div>
                        <div className="image-container">
                            <img src={event.image} alt="picture" className="image-url" />
                            <p className="description">{event.description.substring(0, 50)}</p>
                        </div>
                    </Link>
                    <div>
                        {buttonDisplay}
                    </div>
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
            </div>

        )
    }
}


MyEventCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxStore => ({
    reduxStore,
});


export default connect(mapStateToProps)(withStyles(styles)(MyEventCard));
import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './MyEventCard.css';



const styles = theme => ({

});




class MyEventCard extends React.Component {

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

    render() {

        const { classes, event } = this.props;

        return (
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
                    <Button className="myevents-delete" onClick={this.deleteFromMyEvents}>
                        Cancel
                    </Button>
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
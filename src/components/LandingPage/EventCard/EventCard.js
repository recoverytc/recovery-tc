import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './EventCard.css';

// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//     padding: `0 ${theme.spacing.unit * 3}px`,
//   },
//   paper: {
//     // padding: theme.spacing.unit,
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     maxWidth: 400,
//     margin: `${theme.spacing.unit}px auto`,
//     padding: theme.spacing.unit * 2
//   },
//   imageUrl: {
//     width: "100%",
//   }
// });




class EventCard extends React.Component {

  render() {
    const { event } = this.props;
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
        </div>
    )
  }
}


EventCard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect()(withStyles()(EventCard));
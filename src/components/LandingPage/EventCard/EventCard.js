import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './EventCard.css';


class EventCard extends React.Component {

  render() {
    const { event } = this.props;
    return (
      <div className="root">
        <Link to={`/events/${event.id}`}>
          <div className="event-data-landing">
              <h2>{event.title}</h2>
                <p>{moment(event.date).format("MMM Do YYYY")}</p>
                {/* <p>{moment(event.time, "HH:mm").format("hh:mm A")}</p> */}
          </div>
          <div>
            <p className="attendees">{event.attendee}<FontAwesomeIcon className="arrow-up" icon="arrow-up" /></p>
          </div>
          <div className="image-container">
              <img src={event.image} alt="event" className="image-url" />
              <p className="description">{event.description.substring(0, 150)}...</p>
          </div>
          </Link>
        </div>
    )
  }
}



export default connect()(EventCard);
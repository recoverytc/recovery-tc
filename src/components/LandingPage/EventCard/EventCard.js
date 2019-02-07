import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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
        {/* <Grid container spacing={24} direction="column">
          <Grid item xs={8}> */}
          <Paper className="paper">
            <div>
              <h2>{event.title}</h2>
              <p>{event.date}</p>
              <p>{event.time}</p>
            </div>
            <div>
                <Link to={`/events/${event.id}`}>
                  <img src={event.image} alt="picture" className="image-url" />
                </Link>
            </div>
            </Paper>
          {/* </Grid>
        </Grid> */}
      </div>
    )
  }
}


EventCard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect()(withStyles()(EventCard));
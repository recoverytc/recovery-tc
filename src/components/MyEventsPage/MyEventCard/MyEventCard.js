import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

// import './EventCard.css';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: `0 ${theme.spacing.unit * 3}px`,
    },
    paper: {
        // padding: theme.spacing.unit,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        maxWidth: 400,
        margin: `${theme.spacing.unit}px auto`,
        padding: theme.spacing.unit * 2
    },
    imageUrl: {
        width: "100%",
    }
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
            <div className={classes.root}>
                <Grid container spacing={24} direction="column">
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <div>
                                <h2>{event.title}</h2>
                                <h3>{event.venue}</h3>
                                <p>{event.date}</p>
                                <p>{event.time}</p>
                            </div>
                            <div>
                                <Link to={`/events/${event.id}`}>
                                <img src={event.image} alt="picture" className={classes.imageUrl}/>
                                </Link>
                            </div>
                            <div>
                                <Button onClick={this.deleteFromMyEvents}>
                                Cancel
                                </Button>
                            </div>

                        </Paper>
                    </Grid>
                </Grid>
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
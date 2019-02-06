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

        const {classes}=this.props
        return(
            <div>
                <h1>{this.props.reduxStore.thisEvent.title}</h1>
                <img src={this.props.reduxStore.thisEvent.image} alt="picture" className={classes.imageUrl} />
                <h5>{this.props.reduxStore.thisEvent.venue}</h5>
                <p>{this.props.reduxStore.thisEvent.address}</p>
                <p>{this.props.reduxStore.thisEvent.date}</p>
                <p>{this.props.reduxStore.thisEvent.time}</p>
                <p>{this.props.reduxStore.thisEvent.description}</p>
                <p>{this.props.reduxStore.thisEvent.attendees} of {this.props.reduxStore.thisEvent.capacity}</p>

                <Button onClick={this.addToMyEvents}>
                    Attend
                </Button>
                <Button onClick={this.deleteFromMyEvents}>
                    Cancel
                </Button>



            </div>
        )
    }
}
const mapStateToProps = (reduxStore) =>{
    return{ 
        reduxStore
    }
}

export default connect(mapStateToProps)(withStyles(styles)(EventPage))
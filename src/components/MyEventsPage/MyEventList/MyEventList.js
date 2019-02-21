import React, {Component} from 'react';
import MyEventCard from '../MyEventCard/MyEventCard';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './MyEventList.css';



class MyEventList extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_EVENT_LIST' });
    }


    render() {
        if(this.props.reduxState.myEvents === 0) {
            return (
                <p className="no-events">You don't have any events, check out the <Link to="/home">Events Page</Link>!</p>
            )
        } else {
        return (
            <>
                {this.props.reduxState.myEvents.map(event => {
                    return (
                        <MyEventCard key={event.id} event={event} />
                    )
                })}
            </>
        )
            }
    }
}


const mapStateToProps = reduxState => {
    return {
        reduxState
    }
}


export default connect(mapStateToProps)(MyEventList);
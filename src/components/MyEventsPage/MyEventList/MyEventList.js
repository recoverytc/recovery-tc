import React, {Component} from 'react';
import MyEventCard from '../MyEventCard/MyEventCard';
import { connect } from 'react-redux';



class MyEventList extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_EVENT_LIST' });
    }


    render() {

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


const mapStateToProps = reduxState => {
    return {
        reduxState
    }
}


export default connect(mapStateToProps)(MyEventList);
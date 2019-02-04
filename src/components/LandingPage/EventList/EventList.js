import React from 'react';
import EventCard from '../EventCard/EventCard';
import { connect } from 'react-redux';



class EventList extends React.Component {

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_EVENT_LIST'});
  }


  render () {

    return (
      <>
      {this.props.reduxState.eventList.map( event => {
        return (
          <EventCard key={event.id} event={event} />
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


export default connect(mapStateToProps)(EventList);
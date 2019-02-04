import React from 'react';
import { connect } from 'react-redux';



class EventCard extends React.Component {


  render () {

    console.log(this.props.list);

    return (
      <div id={this.props.event.id}>
        {this.props.event.title}
        {this.props.event.description}
        <img src={this.props.event.image} alt="bowling" />
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}

export default connect()(EventCard);
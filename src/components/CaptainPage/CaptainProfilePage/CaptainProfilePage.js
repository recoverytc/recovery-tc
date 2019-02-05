import React, { Component } from 'react';
import { connect } from 'react-redux';

class CaptainProfilePage extends Component {

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_CAPTAIN_PROFILE', payload: this.props.match.params.id})
  }

  render () {


    let profileContent = this.props.captainProfile.map( (profile, i) => {
      return (
        <div key={i}>
          {profile.first_name}
          {profile.last_name}
          {profile.bio}
          {profile.title}
          <img src={profile.image} alt="event" />
        </div>
      )
    })





    return (
      <div>
        {profileContent}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  captainProfile: state.captainProfile,
})


export default connect(mapStateToProps)(CaptainProfilePage);
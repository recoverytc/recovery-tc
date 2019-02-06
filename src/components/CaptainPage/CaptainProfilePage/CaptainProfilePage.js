import React, { Component } from 'react';
import { connect } from 'react-redux';


// Styles
import './CaptainProfilePage.css';



class CaptainProfilePage extends Component {


  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CAPTAIN_PROFILE', payload: this.props.match.params.id })
  }


  render() {

    let profileContent = this.props.captainProfile.map((profile, i) => {
      return (
        <div key={i}>
          <div className="picture-container">
            <img src={profile.image} alt="me" className="captain-picture" />
          </div>
          <div className="demo-info">
              <button className="edit-button" onClick={() => this.props.history.push(`/captain/profile/edit/${profile.id}`)}>Edit profile</button>
              <button className="create-button" onClick={() => this.props.history.push('/captain/addevent')}>Create event</button>
              {profile.username}
              {profile.first_name}
              {profile.last_name}
              {profile.email}
              {profile.phone}
          </div>
          <div className="bio">
            {profile.bio}
          </div>
          
          <div className="events-page">
            <h1>Events</h1>
              {profile.title}
              <img src={profile.event_image} alt="event" className="captain-picture" />
              <button className="create-button">edit event</button>
          </div>
        </div>
      )
    })





    return (
      <div className="captain-container">
        {profileContent}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  captainProfile: state.captainProfile,
})


export default connect(mapStateToProps)(CaptainProfilePage);
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
        <div key={i} className="captain-container">

          <div className="captain-wrapper">
            <div className="picture-container">
              <img src={profile.image} alt="me" className="captain-picture" />
            </div>
            <div className="icon-buttons">
              <button className="edit-button" onClick={() => this.props.history.push(`/captain/profile/edit/${profile.id}`)}>Edit profile</button>
              <button className="create-button" onClick={() => this.props.history.push('/captain/addevent')}>Create event</button>
            </div>
            <div className="demo-info">
              <p className="demo-p-tag">INFO</p>
              <p className="demo-p-tag">Username: {profile.username}</p>
              <p className="demo-p-tag">Name: {profile.first_name} {profile.last_name}</p>
              <p className="demo-p-tag">Email: {profile.email}</p>
              <p className="demo-p-tag">Phone: {profile.phone}</p>
            </div>
            <div className="bio">
              <p className="demo-p-tag">BIO</p>
              <p className="demo-p-tag">{profile.bio}</p>
            </div>
          </div> {/* .captain-wrapper */}


          <div className="events-page">

            <div className="event-header">
              <h1 className="h1-event">My Current Events</h1>
            </div>

            <div className="event-contents">
              <div className="event-date-time">
                <p>{profile.date}</p>
                <p>{profile.time}</p>
              </div>
              <p className="event-title">{profile.title}</p>

              <div className="event-picture-box">
                <img src={profile.event_image} alt="event" className="event-picture" />
              </div>
              <button className="edit-event-btn">edit event</button>
            </div> {/* .event-content */}

          </div>{/* .events-page */}

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
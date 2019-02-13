import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';

// Styles
import './CaptainProfilePage.css';



class CaptainProfilePage extends Component {

  state = {
    open: false,
    title: '',
    date: '',
    time: '',
    address: '',
    description: '',
    image: '',
    capacity: null,
    venue: '',
    id: '',
    captain_id: ''
  }

  handleOpen = () => {
    console.log(this.state);
    this.setState({
      title: this.props.thisEvent.title,
      date: this.props.thisEvent.date,
      time: this.props.thisEvent.time,
      address: this.props.thisEvent.address,
      description: this.props.thisEvent.description,
      image: this.props.thisEvent.image,
      capacity: this.props.thisEvent.capacity,
      venue: this.props.thisEvent.venue,
      id: this.props.thisEvent.id,
      captain_id: this.props.thisEvent.captain_id
    })
    this.setState({
      open: true
    })
  }
  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value
    })
    console.log(this.state);

  }
  handleDateChange = (event) => {
    this.setState({
      date: event.target.value
    })
  }
  handleTimeChange = (event) => {
    this.setState({
      time: event.target.value
    })
  }
  handleAddressChange = (event) => {
    this.setState({
      address: event.target.value
    })
  }
  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value
    })
  }
  handleImageChange = (event) => {
    this.setState({
      image: event.target.value
    })
  }
  handleCapacityChange = (event) => {
    this.setState({
      capacity: event.target.value
    })
  }
  handleVenueChange = (event) => {
    this.setState({
      venue: event.target.value
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }
  handleSubmitClose = () => {
    this.props.dispatch({ type: 'EDIT_EVENT', payload: this.state })
    this.setState({
      open: false
    })

  }
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CAPTAIN_PROFILE', payload: this.props.match.params.id })
    this.props.dispatch({ type: 'FETCH_EVENT_LIST' });
    this.setState({
      title: this.props.thisEvent.title,
      date: this.props.thisEvent.date,
      time: this.props.thisEvent.time,
      address: this.props.thisEvent.address,
      description: this.props.thisEvent.description,
      image: this.props.thisEvent.image,
      capacity: this.props.thisEvent.capacity,
      venue: this.props.thisEvent.venue,
      id: this.props.thisEvent.id,
      captain_id: this.props.thisEvent.captain_id
    })
  }

  handleEdit = (id) => {
    console.log('editting', id);
    this.props.dispatch({ type: 'FETCH_THIS_EVENT', refresh: id })

    // console.log(this.state)
    setTimeout(this.handleOpen, 3000)
  }
  render() {

    let profileContent = this.props.captainProfile.map((profile, i) => {
      return (
        <div key={i} className="captain-wrapper">

          <div className="picture-container">
            <img src={profile.image} alt="me" className="captain-picture" />
          </div> {/* .picture-container */}

          <div className="icon-buttons">
            <img src="/editIcon.svg" alt="edit profile" className="edit-profile-icon" onClick={() => this.props.history.push(`/captain/profile/edit/${profile.id}`)} />
            {/* <button className="edit-button" onClick={() => this.props.history.push(`/captain/profile/edit/${profile.id}`)}>Edit profile</button> */}
         
            <img src="/addEventIcon.svg" alt="edit event" className="add-event-icon" onClick={() => this.props.history.push('/captain/addevent')} />
            {/* <button className="create-button" onClick={() => this.props.history.push('/captain/addevent')}>Create event</button> */}
          </div> {/* .icon-buttons */}


          <div className="bio">
            <p className="demo-p-tag">INFO</p>
            <div className="style-blank-div"></div>
          </div>

          <div className="demo-info">
            <div className="static-data">
              <p className="demo-p-tag">Username:</p>
              <p className="demo-p-tag">Name: </p>
              <p className="demo-p-tag">Email:</p>
              <p className="demo-p-tag">Phone:</p>
            </div>
            <div className="captain-data">
              <p className="demo-p-tag">{profile.username}</p>
              <p className="demo-p-tag">{profile.first_name} {profile.last_name}</p>
              <p className="demo-p-tag">{profile.email}</p>
              <p className="demo-p-tag">{profile.phone}</p>
            </div>
          </div> {/* .demo-info */}

          <div className="bio">
            <p className="demo-p-tag">BIO</p>
            <div className="style-blank-div"></div>
            <p className="demo-p-tag">{profile.bio}</p>
          </div>
          {/* .bio */}
        </div>
        // .captain-wrapper
      )
    })


    return (
      <div className="captain-container">
        {profileContent}

        {/* Beginning of the EVents page */}
      <div className="event-root">
        <h1 className="h1-event">My Current Events</h1>

        <div className="style-blank-div"></div>


        <div className="event-data-root">
          {this.props.eventList.map((event, i) => {
            if (event.captain_id === this.props.user.id) {
              return (
                <div key={i} className="root2">

                  <div className="event-data">
                    <p>{moment(event.date).format("MMM Do YYYY")}</p>
                    <p>{moment(event.time, "HH:mm").format("hh:mm A")}</p>
                    <p className="event-title">{event.title}</p>
                  </div>

                  <div className="image-container">
                    <img src={event.image} alt="event" className="image-url" />
                  </div>

                  {/* <button onClick={() => this.handleEdit(event.id)} className="edit-event-btn">edit event</button> */}
                  <img src="/editEventIcon.svg" alt="edit Event" className="edit-event-btn" onClick={() => this.handleEdit(event.id)} />
                </div>
                // .root2
              )
            }
          })}
          </div>{/* .event-data-root */}
        </div> {/* .event-root */}


        {/* Pop up Dialog to edit events */}
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle>Edit Event</DialogTitle>
            <DialogContent>
              <div>
                <TextField
                  label="Title"
                  placeholder="Title"
                  value={this.state.title}
                  margin="normal"
                  onChange={this.handleTitleChange}
                />
              </div>
              <div>
                <TextField
                  type="date"
                  value={moment(this.state.date).format('YYYY-MM-DD')}
                  margin="normal"
                  onChange={this.handleDateChange}
                />
              </div>
              <div>
                <TextField
                  type="time"
                  margin="normal"
                  value={this.state.time} //no moment.js here!!!
                  onChange={this.handleTimeChange}
                />
              </div>
              <div>
                <TextField
                  label="Address"
                  placeholder="Address"
                  margin="normal"
                  value={this.state.address}
                  onChange={this.handleAddressChange}

                />
              </div>
              <div>
                <TextField
                  label="Description"
                  placeholder="Description"
                  margin="normal"
                  value={this.state.description}
                  onChange={this.handleDescriptionChange}
                />
              </div>
              <div>
                <TextField
                  label="Image Url"
                  placeholder="Image Url"
                  margin="normal"
                  value={this.state.image}
                  onChange={this.handleImageChange}
                />
              </div>
              <div>
                <TextField
                  label="Capacity"
                  placeholder="Capacity"
                  margin="normal"
                  value={this.state.capacity}
                  onChange={this.handleCapacityChange}
                />
              </div>
              <div>
                <TextField
                  label="Venue"
                  placeholder="Venue"
                  margin="normal"
                  value={this.state.venue}
                  onChange={this.handleVenueChange}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} >
                Cancel
                </Button>
              <Button onClick={this.handleSubmitClose} >
                Submit
                  </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      // .captain-container
    )
  }
}


const mapStateToProps = state => ({
  captainProfile: state.captainProfile,
  thisEvent: state.thisEvent,
  eventList: state.eventList,
  user: state.user,
})


export default connect(mapStateToProps)(CaptainProfilePage);
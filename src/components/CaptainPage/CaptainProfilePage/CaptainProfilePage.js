import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import { Link } from 'react-router-dom';
import axios from 'axios';



// Styles
import './CaptainProfilePage.css';



class CaptainProfilePage extends Component {

  state = {
    open: false,
    open2: false,
    title: '',
    date: '',
    time: '',
    address: '',
    description: '',
    image: '',
    capacity: null,
    venue: '',
    id: '',
    captain_id: '',
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
      captain_id: this.props.thisEvent.captain_id,
      // file: null,
    })
    this.setState({
      open: true
    })
  }
  
  handleOpen2 = () => {
    this.setState({
      open2: true
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
      open: false,
      open2: false
    })
  }

    handleFileUpload = (event) => {
    this.setState({file: event.target.files});
    console.log(this.state.files);
  }


  handleSubmitClose = () => {
    this.props.dispatch({ type: 'EDIT_EVENT', payload: this.state })
      const formData = new FormData();
        formData.append('file', this.state.file[0]);
      axios.put(`api/imageUpload/edit/account`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
              this.props.history.push(`/captain/profile/${this.props.user.id}`);
        }).catch(error => {
          // handle your error
          console.log(error);
        });
    this.setState({
      open: false
    })

  }

  handleSubmitCloseImage = () => {
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
  axios.put(`api/imageUpload/edit/account`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
          this.props.history.push(`/captain/profile/${this.props.user.id}`);
          this.props.dispatch({ type: 'FETCH_CAPTAIN_PROFILE', payload: this.props.match.params.id })
    }).catch(error => {
      // handle your error
      console.log(error);
    });
this.setState({
  open2: false
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

  handleCancelEvent = (id) => {

    this.props.dispatch({ type: 'CANCEL_EVENT', 
    payload: {id: id}, 
    refresh: {id: id} })

    // console.log(this.state)

  }

  handleEdit = (id) => {
    console.log('editting', id);
    this.props.dispatch({ type: 'FETCH_THIS_EVENT', refresh: id })

    // console.log(this.state)
    setTimeout(this.handleOpen, 200)
  }

  handleEditImage = () => {
    this.handleOpen2();
  }

  render() {

    let profileContent = this.props.captainProfile.map((profile, i) => {
      return (
        <div key={i} className="captain-wrapper">

          <div className="picture-container">
            <img src={profile.image} alt="me" className="captain-picture" />
            <button className="edit-image" onClick={() => this.handleEditImage()}>X</button>
          </div> {/* .picture-container */}

          <div className="icon-buttons">
          <div className="icon-box">
            <img src="/editIcon.svg" alt="edit profile" className="icons" onClick={() => this.props.history.push(`/captain/profile/edit/${profile.id}`)} />
            <p>Edit Profile</p>
          </div>
          <div className="icon-box">
            <img src="/addEventIcon.svg" alt="edit event" className="icons" onClick={() => this.props.history.push('/captain/addevent')} />
            <p>Create Event</p>
          </div>
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
                <div key={i} className="root">
                 <Link to={`/events/${event.id}`}>
                  <div className="event-data">
                    <p>{moment(event.date).format("MMM Do YYYY")}</p>
                    {/* <p>{moment(event.time, "HH:mm").format("hh:mm A")}</p> */}
                    <p className="event-title">{event.title}</p>
                  </div>

                  <div className="image-container">
                    <img src={event.image} alt="event" className="image-url" />
                  </div>
                  </Link>
                <div className="edit-event-box">
                  <img src="/editEventIcon.svg" alt="edit Event" className="event-btn" onClick={() => this.handleEdit(event.id)} />
                  <p>Edit Event</p>
                </div>
                <div className="delete-event-box">
                  <img src="/delete.svg" alt="cancel Event" className="event-btn" onClick={() => this.handleCancelEvent(event.id)} />
                  <p>Delete</p>
                </div>
                </div>
                // .root2
              )
            }
          })}
          </div>{/* .event-data-root */}
        </div> {/* .event-root */}


        {/* Pop up Dialog to edit events */}
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
              <Button className="modal-cancel" onClick={this.handleClose} >
                Cancel
                </Button>
              <Button className="modal-submit" onClick={this.handleSubmitClose} >
                Submit
                  </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={this.state.open2}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle>Edit Profile Image</DialogTitle>
            <DialogContent>
              <div className="img-select">
                <p>Image</p>
                <input label='upload file' type='file' onChange={this.handleFileUpload} />
              </div>
            </DialogContent>
            <DialogActions>
              <Button className="modal-cancel" onClick={this.handleClose} >
                Cancel
                </Button>
              <Button className="modal-submit" onClick={this.handleSubmitCloseImage} >
                Submit
                  </Button>
            </DialogActions>
          </Dialog>
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
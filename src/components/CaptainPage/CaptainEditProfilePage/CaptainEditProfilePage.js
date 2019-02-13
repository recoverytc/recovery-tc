import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import './CaptainEditProfilePage.css';

import '../CaptainProfilePage/CaptainProfilePage';





class CaptainEditProfilePage extends Component {

  state ={
    first_name: this.props.user.first_name,
    last_name: this.props.user.last_name,
    email: this.props.user.email,
    phone: this.props.user.phone,
    image: this.props.user.image,
    bio: this.props.user.bio,
    user_id: this.props.user.id
  }

  handleClick = () => {
    this.props.dispatch({type: 'UPDATE_CAPTAIN_PROFILE_INFO', payload: this.state});
    this.setState({
      first_name:'',
      last_name:'',
      email: '',
      phone: '',
      image: '',
      bio: '',
      user_id: this.props.user.id
    })
  }

  handleChange = (propertyName) => (event) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    })
  }


  render() {
    return (
      <div>
        <form className="form-container">
        <h1 className="form-title">Profile Create</h1>
          <TextField
            id="outlined-with-placeholder"
            label="First Name"
            fullWidth
            margin="normal"
            variant="outlined"
            className="text-styles"
            value={this.state.first_name}
            onChange={this.handleChange('first_name')}
          />
          <TextField
            id="outlined-with-placeholder"
            label="Last Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.last_name}
            onChange={this.handleChange('last_name')}
          />
          <TextField
            id="outlined-with-placeholder"
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
          <TextField
            id="outlined-with-placeholder"
            label="Phone"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.phone}
            onChange={this.handleChange('phone')}
          />
          <TextField
            id="outlined-with-placeholder"
            label="Image"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.image}
            onChange={this.handleChange('image')}
          />
          <TextField
            id="outlined-with-placeholder"
            label="Bio"
            multiline
            rows="5"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.bio}
            onChange={this.handleChange('bio')}
          />
          <Button 
            variant="contained"
            color="primary" 
            className="add-event-submit"
            onClick={this.handleClick}> Update </Button>
        </form>
      </div> 
    )
  }
}


const mapStateToProps = state => ({
  user: state.user,
})


export default connect(mapStateToProps)(CaptainEditProfilePage);
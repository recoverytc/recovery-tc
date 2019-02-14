import React, { Component } from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './RegisterPage.css';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

  };

  registerUser = (event) => {
    event.preventDefault();
    if(this.state.phone) {
      axios.get(`/api/user/num/${this.state.phone}`).then(response => {
        if(response.data.valid) {
          if(this.state.username && 
             this.state.password &&
             this.state.confirmPassword &&
             this.state.firstName &&
             this.state.lastName &&
             this.state.email &&
             this.state.phone) {
              if(this.state.password === this.state.confirmPassword) {
                this.props.dispatch({
                  type: 'REGISTER',
                  payload: {
                    username: this.state.username,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    phone: this.state.phone,
                  },
                });
                this.props.history.push('/home')
              } else {
                this.props.dispatch({type: 'REGISTRATION_PASSWORD_ERROR'});
              }
          } else {
            this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
          }
        } else {
          this.props.dispatch({type: 'REGISTRATION_PHONE_ERROR'});
        }
      })
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser} className="form-container">
          <h1 className="form-title">Register User</h1>
          <div>
            <TextField
              variant="outlined"
              label="First Name"
              placeholder="First Name"
              margin="normal"
              value={this.state.firstName}
              onChange={this.handleInputChangeFor('firstName')}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Last Name"
              placeholder="Last Name"
              margin="normal"
              value={this.state.lastName}
              onChange={this.handleInputChangeFor('lastName')}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Username"
              placeholder="Username"
              margin="normal"
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Password"
              placeholder="Password"
              type="password"
              margin="normal"
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Confirm Password"
              placeholder="Confirm Password"
              margin="normal"
              type="password"
              value={this.state.confirmPassword}
              onChange={this.handleInputChangeFor('confirmPassword')}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Email Address"
              placeholder="Email Address"
              margin="normal"
              value={this.state.email}
              onChange={this.handleInputChangeFor('email')}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Phone Number"
              placeholder="Phone Number(For Admin use only)"
              margin="normal"
              value={this.state.phone}
              onChange={this.handleInputChangeFor('phone')}
            />
          </div>
          <center>
          <Button
            onClick={this.registerUser}
            color="secondary"
            variant="contained"
            type="submit"
            name="submit"
            value="Register"
            className="create-account"
          >
            Create Account
          </Button>
          <Button
            onClick={() => { this.props.history.push("/") }}
            color="primary"
            variant="contained"
            className="have-account"
          >
            Already have an account?
          </Button>
        </center>
        </form>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);


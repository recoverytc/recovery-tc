import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {TextField, Button} from '@material-ui/core';
import './LoginPage.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login} className="form-container">
          <h1 className="form-title">Login</h1>
          <div>
              <TextField
                variant="outlined"
                label="Username"
                type="text"
                name="username"
                className="input"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
          </div>
          <div>
              <TextField
                variant="outlined"
                label="Password"
                type="password"
                name="password"
                className="input"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
          </div>
            <Button
              className="login"
              type="submit"
              name="submit"
              value="Log In"
            >
            Log In
            </Button>
            <Button
              type="button"
              className="register"
              onClick={() => {this.props.history.push("/register")}}
            >
              Register
            </Button>
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

export default connect(mapStateToProps)(LoginPage);

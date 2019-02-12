import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './SignIn.css';
import { Button } from '@material-ui/core';
// import background from '../../../../public/skylineBW.jpg';

class SignIn extends Component {
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
      <div className="signin-container"> 
        <div className="signin-background">
            <div className="greeting-div">
                <p className="signin-title">Welcome to Recovery Saint Paul!</p>
                <p className="signin-greeting">Recovery Saint Paul is a community of people living in recovery from substance use disorders 
                - all backgrounds, pathways, and flavors of recovery, making the most of life in the Twin Cities.</p>
                <p className="signin-greeting-close">Check out our events below.</p>
            </div>
            {this.props.errors.loginMessage && (
            <h2
                className="alert"
                role="alert"
            >
                {this.props.errors.loginMessage}
            </h2>
            )}     
            <div className="signin-buttons">
            <Button
                type="button"
                className="signin-submit"
                onClick={() => {this.props.history.push("/register")}}
            >
                Sign Up
            </Button>
            <Button
                type="button"
                className="signin-submit"
                onClick={() => {this.props.history.push("/login")}}
            >
                Log In
            </Button>
            </div>
        </div>
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

export default withRouter(connect(mapStateToProps)(SignIn));
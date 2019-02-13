import React, { component } from 'react';
import EventList from './EventList/EventList';
import './LandingPage.css';
import SearchBar from '../SearchBar/SearchBar';
import SignIn from './SignIn/SignIn';
import {connect} from 'react-redux';



const LandingPage = (props) => (
  <div className="landing-container">
  {props.user.id === undefined && (
    <SignIn/>
  )}
  <SearchBar />
      <div className="event-container">
        {/* <SearchBar /> */}
        <EventList />
      </div>
  </div>
);

const mapStateToProps = state => ({
  user: state.user,
});


export default connect(mapStateToProps)(LandingPage);
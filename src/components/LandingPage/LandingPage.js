import React from 'react';
import EventList from './EventList/EventList';
import './LandingPage.css';
import SearchBar from '../SearchBar/SearchBar'



const LandingPage = () => (
  <div>
      <h1 className="landing-title">RecoveryTC Events!</h1>
      <SearchBar />
      <div className="event-container">
      <EventList />
  </div>
  </div>
);


export default LandingPage;
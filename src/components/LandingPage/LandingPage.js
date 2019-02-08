import React from 'react';
import EventList from './EventList/EventList';
import './LandingPage.css';



const LandingPage = () => (
  <div>
      <h1 className="landing-title">Check out these Events!</h1>
      <div className="event-container">
      <EventList />
  </div>
  </div>
);


export default LandingPage;
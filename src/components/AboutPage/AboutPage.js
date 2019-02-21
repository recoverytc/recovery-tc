import React from 'react';
import './AboutPage.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div className="about-container">
    <h1 className="about-title">About Recovery St. Paul</h1>
      <p className="about-paragraph">
        Recovery St. Paul is an event planning mobile first webapp for members of our local sober community with an emphasis on safety and communication. It's a place where people in recovery can go to find out about sober events to encourage and support them in their personal journeys of recovery. The events are hosted by veteran members of the community known as Captains who are known personally by the Admin team. Any member who attends an event is given the opportunity to leave non-published feedback after an event for the Admin team to see and quickly address any issues that may arise.
        
      </p>

  </div>
);


export default AboutPage;

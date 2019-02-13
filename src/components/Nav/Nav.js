import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

const Nav = (props) => (
  <header className="navbar">
    <nav className="navbar__navigation">
      <div className="navbar__toggle-button">
          <DrawerToggleButton click={props.drawerClickHandler}/>
      </div>
      <div className="navbar__logo"><Link to="/home"><img className="logo" src="/image.png" /></Link><h3 className="navbar__statement">DO STUFF.</h3></div>
      <div className="spacer" />
      <div className="navbar_navigation-items">
        <ul>
          <li><Link to="/login">{props.user.id ? 'All Events' : 'Login / Register'}</Link></li>
          {props.user.id && (
            <>
              <li><Link to="/myevents">My Events</Link></li>
            </>
          )}
          {props.user.admin && (
            <>
              <li><Link to="/admin/users">Manage Users</Link></li>
              <li><Link to="/admin/events">Manage Events</Link></li>
            </>
          )}
          {props.user.captain && (
            <>
              <li><Link to={`/captain/profile/${props.user.id}`}>Profile</Link></li>
              <li><Link to="/captain/addevent">Add Event</Link></li>
              <li><Link to={`/captain/profile/edit/${props.user.id}`}>Edit Profile</Link></li>
            </>
          )}
          {props.user.id && (
              <li><LogOutButton/></li>
          )}
        </ul>
      </div>
    </nav>
  </header>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './SideDrawer.css';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show) {
        drawerClasses = 'side-drawer open';
    }
    return (
        <nav className={drawerClasses}>
            <ul>
            <li><Link onClick={props.click} to="/login">{props.user.id ? 'All Events' : 'Login / Register'}</Link></li>
          {props.user.admin === false && (
            <>
              <li><Link onClick={props.click} to="/myevents">My Events</Link></li>
              <li><LogOutButton/></li>
            </>
          )}
          {props.user.admin && (
            <>
              <li><Link onClick={props.click} to="/admin/users">Manage Users</Link></li>
              <li><Link onClick={props.click} to="/admin/events">Manage Events</Link></li>
            </>
          )}
          {props.user.captain && (
            <>
              <li><Link onClick={props.click} to="/captain/profile">Profile</Link></li>
              <li><Link onClick={props.click} to="/captain/addevent">Add Event</Link></li>
              <li><Link onClick={props.click} to="/captain/profile/edit">Edit Profile</Link></li>
              <li><LogOutButton/></li>
            </>
          )}
            </ul>
        </nav>
    );
};

const mapStateToProps = state => ({
    user: state.user,
  });

export default connect(mapStateToProps)(sideDrawer);
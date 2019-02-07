import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

const Nav = (props) => (
  // <div className="nav">
  //   <Link to="/home">
  //     <h2 className="nav-title">Prime Solo Project</h2>
  //   </Link>
  //   <div className="nav-right">
  //     <Link className="nav-link" to="/home">
  //       {/* Show this link if they are logged in or not,
  //       but call this link 'Home' if they are logged in,
  //       and call this link 'Login / Register' if they are not */}
  //       {props.user.id ? 'Home' : 'Login / Register'}
  //     </Link>
  //     {/* Show the link to the info page and the logout button if the user is logged in */}
  //     {props.user.id && (
  //       <>
  //         <Link className="nav-link" to="/info">
  //           Info Page
  //         </Link>
  //         <LogOutButton className="nav-link"/>
  //       </>
  //     )}
  //     {/* Always show this link since the about page is not protected */}
  //     <Link className="nav-link" to="/about">
  //       About
  //     </Link>
  //   </div>
  // </div>
  <header className="navbar">
    <nav className="navbar__navigation">
      <div className="navbar__toggle-button">
          <DrawerToggleButton click={props.drawerClickHandler}/>
      </div>
      <div className="navbar__logo"><Link to="/home">LOGO</Link></div>
      <div className="spacer" />
      <div className="navbar_navigation-items">
        <ul>
          <li><Link to="/login">{props.user.id ? 'All Events' : 'Login / Register'}</Link></li>
          {props.user.admin === false && (
            <>
              <li><Link to="/myevents">My Events</Link></li>
              <li><LogOutButton/></li>
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
              <li><LogOutButton/></li>
            </>
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

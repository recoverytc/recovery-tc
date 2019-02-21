import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import LandingPage from '../LandingPage/LandingPage';

import './App.css';
import MyEventsPage from '../MyEventsPage/MyEventsPage';
import AdminUsersPage from '../Admin/AdminUsersPage/AdminUsersPage';

// ------SPACE FOR IMPORTING COMPONENTS------ //
import AdminEventAttendeesPage from '../Admin/AdminEventAttendeesPage/AdminEventAttendeesPage';
import AdminEventsPage from '../Admin/AdminEventsPage/AdminEventsPage';
import EventForm from '../EventForm/EventForm';
import LoginPage from '../LoginPage/LoginPage';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';
import RegisterPage from '../RegisterPage/RegisterPage';

import CaptainProfilePage from '../CaptainPage/CaptainProfilePage/CaptainProfilePage';
import CaptainEditProfilePage from '../CaptainPage/CaptainEditProfilePage/CaptainEditProfilePage';

import EventPage from '../EventPage/EventPage';
<<<<<<< HEAD
=======

>>>>>>> 16a8b97a244e23c5ff1fd92847ba80eacc4d873f
import SearchList from '../SearchList/SearchList';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowUp);

//This component serves as the root of the app, it contains the routes to all of the components of the app.
class App extends Component {
  state = {
    sideDrawerOpen: false,
  };

  componentDidMount() {
    //Gets the current user.
    this.props.dispatch({ type: 'FETCH_USER' }) //to userSaga
  }

  //This method determines whether the menu sidedrawer should be open or not.
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  //This method determines whether the backdrop should be displayed or not.
  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false })
  };

  render() {
    //Declaring the backdrop variable in a broader scope.
    let backdrop;
    //If the sideDrawer is open, display the backdrop
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <Router>
        <div style={{ height: "100%" }}>
          <Nav drawerClickHandler={this.drawerToggleClickHandler} />
          <SideDrawer click={this.drawerToggleClickHandler} show={this.state.sideDrawerOpen} />
          {backdrop}
          <div>
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/login" />
              {/* Checking to see if there is an account logged in */}
              {this.props.user.id && (
                <Redirect exact from="/login" to="/home" />
              )}

              {/* redirect captain to create bio if no bio on file */}
              {this.props.user.captain === true && this.props.user.bio === null && (
                <Redirect exact from="/home" to={`/captain/profile/edit/${this.props.user.id}`} />
              )}

              <Route
                path="/login"
                component={LoginPage}
              />
              <Route
                path="/register"
                component={RegisterPage}
              />
              <Route
                path="/home"
                component={LandingPage}
              />
              {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
              <Route
                exact
                path="/aboutpage"
                component={AboutPage}
              />
              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}

              <ProtectedRoute
                exact
                path="/myevents"
                component={MyEventsPage}
              />

              <ProtectedRoute
                exact
                path="/events/:id"
                component={EventPage}
              />


              {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}

              <ProtectedRoute
                exact
                path="/admin/users"
                component={AdminUsersPage}
              />

              <ProtectedRoute
                exact
                path="/admin/events"
                component={AdminEventsPage}
              />

              <ProtectedRoute
                exact
                path="/admin/events/attendees/:id"
                component={AdminEventAttendeesPage}
              />

              <ProtectedRoute
                exact
                path="/captain/profile/:id"
                component={CaptainProfilePage}
              />

              <ProtectedRoute
                exact
                path="/captain/addevent"
                component={EventForm}
              />

              <ProtectedRoute
                exact
                path="/captain/profile/edit/:id"
                component={CaptainEditProfilePage}
              />
              <ProtectedRoute
                exact
                path="/search/results/:id"
                component={SearchList}
              />

              <ProtectedRoute
                exact
                path="/search/results/"
                component={SearchList}
              />

              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(App);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './AdminEventsPage.css';

import moment from 'moment';




class AdminEventsPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ADMIN_EVENT_LIST' });
  }

  getStripedStyle(i) {
    return { backgroundColor: i % 2 ? '#d3fbe7' : '#f3f6fc' };
  }



  render() {

    let adminEventContent = this.props.eventList.map((row, i) => {
      return (
        <TableRow key={i} style={this.getStripedStyle(i)}>
          <TableCell>{row.title}</TableCell>
          <TableCell>{moment(row.date).format("MMM Do YYYY")}</TableCell>
          <TableCell>{row.attendee}
            <Button
              onClick={() => this.props.history.push(`/admin/events/attendees/${row.id}`)}
              color="secondary"
              variant="contained"
            >
              View Attendees
            </Button>
          </TableCell>
          <TableCell>{row.first_name} {row.last_name}</TableCell>
          <TableCell>{row.rating}</TableCell>
        </TableRow>
      )
    })



    return (
      <Paper className="paper-table">
        <h1 style={{ textAlign: 'center' }}>Manage Events List</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Attendees</TableCell>
              <TableCell>Captain</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminEventContent}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  eventList: state.eventList,
  user: state.user
});

export default connect(mapStateToProps)(withRouter(AdminEventsPage));
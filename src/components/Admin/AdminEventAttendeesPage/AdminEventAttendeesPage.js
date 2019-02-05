import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class AdminEventAttendeesPage extends Component {
    componentDidMount() {
        this.props.dispatch({type: 'FETCH_EVENT_ATTENDEES', payload: this.props.match.params.id});
    }


    render() {
        let tableContentOne = this.props.attendeesList.map((row, i) => {
          return (
              <TableRow key={i}>
                  <TableCell>
                      {row.first_name} {row.last_name}
                  </TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.attended}</TableCell>
                  <TableCell>{row.feedback}</TableCell>
                  <TableCell>{row.rating}</TableCell>
              </TableRow>
          )
      })
        return (
            <Paper>
        <h1 style={{ textAlign: 'center' }}>Event Attendees/Feedback</h1>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Feedback</TableCell>
                    <TableCell>Rating</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tableContentOne}
            </TableBody>
        </Table>
    </Paper>
        )
    }
}

const mapStateToProps = state => ({
    attendeesList: state.attendeesList,
    user: state.user,
});

export default connect(mapStateToProps)(AdminEventAttendeesPage);
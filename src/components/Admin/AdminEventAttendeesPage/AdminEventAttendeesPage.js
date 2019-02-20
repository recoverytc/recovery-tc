import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './AdminEventAttendeesPage';


class AdminEventAttendeesPage extends Component {
    componentDidMount() {
        this.props.dispatch({type: 'FETCH_ATTENDEES_LIST', payload: this.props.match.params.id}); //to attendeesListSaga
    }

    getStripedStyle(i) {
        return { backgroundColor: i % 2 ? '#d3fbe7' : '#e5fffe' };
    }
        

    render() {
        let tableContentOne = this.props.attendeesList.map((row, i) => {
          return (
              <TableRow key={i} style={this.getStripedStyle(i)}>
                  <TableCell>
                      {row.title}
                  </TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.comment}</TableCell>
                  <TableCell>{row.rating}</TableCell>
              </TableRow>
          )
      })
        return (
            <Paper className="paper-table">
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
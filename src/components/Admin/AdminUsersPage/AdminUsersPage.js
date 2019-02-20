import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './AdminUsersPage.css';
import swal from 'sweetalert';

// This view allows Admins to view a compelte list of all registered accounts.
class AdminUsersPage extends Component {
    componentDidMount() {
        //Fetches all users
        this.props.dispatch({ type: 'FETCH_ALL_USERS' }); //to userListSaga
    }
    // This method allows Admins to promote/demote accounts to and from the Captain Status.
    changeRole = (user, captainButton) => {
        swal({
            title: "Are you sure?",
            text: `Are you sure you want to ${captainButton}?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal(`Account has been ${captainButton + 'd'}`, {
                icon: "success",
              });
                this.props.dispatch({ type: 'CHANGE_CAPTAIN_STATUS', payload: user }); //to userListSaga
            } else {
              swal(`${captainButton} has been cancelled` )
            }
          });
    }

    // This method allows Admins to activate/deactivate accounts.
    changeActiveStatus = (user, activeButton) => {
        swal({
            title: "Are you sure?",
            text: `Are you sure you want to ${activeButton}?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal(`Account has been ${activeButton + 'd'}`, {
                icon: "success",
              });
                this.props.dispatch({ type: 'CHANGE_ACTIVE_STATUS', payload: user }); //to userListSaga
            } else {
              swal(`${activeButton} has been cancelled` )
            }
          });
    }

    //This method gives the table striped rows
    getStripedStyle(i) {
        return { backgroundColor: i % 2 ? '#d3fbe7' : '#e5fffe' };
    }

    render() {
        // This maps the list of all accounts/users into a table, and also determines which buttons should be displayed.
        let tableContentOne = this.props.userList.map((row, i) => {
            let captain;
            let activeButton;
            let captainButton;
            let buttonClassActive = "users-button";
            let buttonClassCaptain = "users-button";
            if (this.props.userList[i].captain) {
                captainButton = 'Demote';
                captain = 'Yes';
                // captainStatus = "demoted"
            } else {
                captain = 'No';
                captainButton = 'Promote';
                buttonClassCaptain = "active-button"
                // captainStatus="Promoted"
            }
            if (this.props.userList[i].active) {
                activeButton = 'Deactivate';
                // activeStatus = 'de-activated';
            } else {
                activeButton = 'Re-activate';
                buttonClassActive = "active-button"
                // activeStatus = "activated";


            }
            return (
                <TableRow key={i} style={this.getStripedStyle(i)}>
                    <TableCell>
                        {row.first_name} {row.last_name}
                    </TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{captain}
                        <Button

                            onClick={() => this.changeRole(this.props.userList[i], captainButton)}

                            className={buttonClassCaptain}

                            color="secondary"
                            variant="contained"
                        >
                            {captainButton}
                        </Button>
                    </TableCell>
                    <TableCell>
                        <Button
                            onClick={() => this.changeActiveStatus(this.props.userList[i], activeButton)}

                            className={buttonClassActive}

                            color="secondary"
                            variant="contained"
                        >
                            {activeButton}
                        </Button>
                    </TableCell>
                </TableRow>
            )
        })
        return (
            <Paper className="paper-table">
                <h1 style={{ textAlign: 'center' }}>Manage Accounts</h1>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Captain</TableCell>
                            <TableCell>Deactivate</TableCell>
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
    userList: state.userList,
    user: state.user,
});

export default connect(mapStateToProps)(AdminUsersPage);
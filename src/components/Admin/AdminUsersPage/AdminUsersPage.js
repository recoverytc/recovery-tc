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
import swal from 'sweetalert'

class AdminUsersPage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ALL_USERS' });
    }

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
              swal(`Account has been ${captainButton}`, {
                icon: "success",
              });
              this.props.dispatch({ type: 'CHANGE_CAPTAIN_STATUS', payload: user });
            } else {
              swal(`${captainButton} has been cancelled` )
            }
          });
        
    }

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
              swal(`Account has been ${activeButton}`, {
                icon: "success",
              });
              this.props.dispatch({ type: 'CHANGE_ACTIVE_STATUS', payload: user });
            } else {
              swal(`${activeButton} has been cancelled` )
            }
          });
        
    }

    getStripedStyle(i) {
        return { backgroundColor: i % 2 ? '#d3fbe7' : '#e5fffe' };
    }

    render() {
        let tableContentOne = this.props.userList.map((row, i) => {
            let captain;
            let activeButton;
            let captainButton;
            let buttonClassActive = "users-button";
            let buttonClassCaptain = "users-button";
            if (this.props.userList[i].captain) {
                captainButton = 'Demote';
                captain = 'Yes';
            } else {
                captain = 'No';
                captainButton = 'Promote';
                buttonClassCaptain = "active-button"
            }
            if (this.props.userList[i].active) {
                activeButton = 'Deactivate';
            } else {
                activeButton = 'Re-activate';
                buttonClassActive = "active-button"

                
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
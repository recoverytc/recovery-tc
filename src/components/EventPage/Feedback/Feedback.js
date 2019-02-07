import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}




class Feedback extends Component {

  state = {
    open: false
  }

  // opens modal
  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  // close modal
  handleClose = () => {
    this.setState({
      open: false
    })
  }



  render () {



    return (
    
        <Modal open={this.state.open} style={getModalStyle()}>

        </Modal>
  
    )
  }
}


Feedback.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Feedback);
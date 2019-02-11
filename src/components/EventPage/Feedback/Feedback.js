import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Dialog, DialogTitle, TextField } from '@material-ui/core';


import './Feedback.css';




class Feedback extends Component {

  state = {
    feedback: '',
    comment: '',
    rating: '',
    event_id: this.props.thisEvent.id
  }


  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_THIS_EVENT' });

  }

  // close modal
  handleClose = () => {
    this.props.onClose();
  }

  handleClick = () => {
    console.log("btn has been clicked")
    this.props.dispatch({ type: 'ADD_RATING', payload: this.state })
    this.setState({
      feedback: true,
      comment: '',
      rating: '',
      event_id: this.props.thisEvent.id,
      user_id: this.props.user.id
    })
  }

  handleChange = (propertyName) => (event) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    })
  }


  render() {


    return (

      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" >
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
  
        <form>
      

          <TextField
            label="comments"
            multiline
            rows="5"
            fullWidth
            margin="normal"
            variant="outlined"
            value={this.state.comment}
            onChange={this.handleChange('comment')}
          />
        </form>
      </Dialog>

    )
  }
}


// state = {
//   open: false,
// }

// handleClickOpen = () => {
//   this.setState({
//       open: true,
//   })
// }

// handleClose = () => {
//   this.setState({
//       open: false,
//   })
// }

 {/* <Feedback open={this.state.open} onclose={this.handleClose}/> */}

const mapStateToProps = state => ({
  thisEvent: state.thisEvent,
  user: state.user
})


export default connect(mapStateToProps)(Feedback);
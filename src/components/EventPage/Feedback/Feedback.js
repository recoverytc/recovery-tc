import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import './Feedback.css';

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
    open: false,
    feedback: false,
    comment: '',
    rating: '',
    event_id: this.props.thisEvent.id
  }


  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_THIS_EVENT' });

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

      <Modal open={this.state.open} style={getModalStyle()}>
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
      </Modal>

    )
  }
}


Feedback.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  thisEvent: state.thisEvent,
  user: state.user
})


export default connect(mapStateToProps)(withStyles(styles)(Feedback));
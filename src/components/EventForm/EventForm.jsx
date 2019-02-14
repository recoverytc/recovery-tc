import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import {connect} from 'react-redux';
import './EventForm.css';
import moment from 'moment';
import axios from 'axios';


class EventForm extends Component {
    state = {
        title : '',
        date : '',
        time : '',
        address : '',
        description : '',
        image : '',
        capacity : null,
        venue: '',
        file: null,
    }

    handleTitleChange = (event) =>{
        this.setState({
            title : event.target.value
        })
    }
    handleDateChange = (event) =>{
        this.setState({
            date : event.target.value
        })
    }
    handleTimeChange = (event) =>{
        this.setState({
            time : event.target.value
        })
    }
    handleAddressChange = (event) =>{
        this.setState({
            address : event.target.value
        })
    }
    handleDescriptionChange = (event) =>{
        this.setState({
            description : event.target.value
        })
    }
    handleImageChange = (event) =>{
        this.setState({
            image : event.target.value
        })
    }
    handleCapacityChange = (event) =>{
        this.setState({
            capacity : event.target.value
        })
    }
    handleVenueChange = (event) =>{
        this.setState({
            venue : event.target.value
        })
    }

    
    handleClick = () =>{
        console.log(this.state);
        const formData = new FormData();
        formData.append('file', this.state.file[0]);
        formData.append('title', this.state.title);
        formData.append('date', this.state.date);
        formData.append('time', this.state.time);
        formData.append('address', this.state.address);
        formData.append('description', this.state.description);
        formData.append('image', this.state.image);
        formData.append('capacity', this.state.capacity);
        formData.append('venue', this.state.venue);
        axios.post(`api/imageUpload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
                this.props.history.push(`/captain/profile/${this.props.user.id}`);
          }).catch(error => {
            // handle your error
            console.log(error);
          });
    }

    handleFileUpload = (event) => {
        this.setState({file: event.target.files});
        console.log(this.state.files);
      }

    render() {
        return (
            <form className="form-container">
                <h1 className="form-title">Add an Event</h1>
                    <TextField
                        variant="outlined"
                        label="Title"
                        placeholder="Title"
                        margin="normal"
                        className="input"
                        inputProps={{ maxLength: 60 }}
                        onChange={this.handleTitleChange}
                    />
                    <TextField 
                    variant="outlined"
                    type="date"
                    margin="normal"
                    onChange={this.handleDateChange}
                    />
                    <TextField 
                    variant="outlined"
                    type="time"
                    margin="normal"
                    onChange={this.handleTimeChange}
                    />
                    <TextField
                        variant="outlined"
                        label="Venue"
                        placeholder="Venue"
                        margin="normal"
                        inputProps={{ maxLength: 200 }}
                        onChange={this.handleVenueChange}
                    />
                    <TextField
                        label="Address"
                        variant="outlined"
                        placeholder="Address"
                        margin="normal"
                        inputProps={{ maxLength: 300 }}
                        onChange={this.handleAddressChange}
                    />
                    <TextField
                        variant="outlined"
                        label="Description"
                        placeholder="Description"
                        margin="normal"
                        inputProps={{ maxLength: 2000 }}
                        onChange={this.handleDescriptionChange}
                    />
                    {/* <TextField
                        variant="outlined"
                        label="Image Url"
                        placeholder="Image Url"
                        margin="normal"
                        inputProps={{ maxLength: 300 }}
                        onChange={this.handleImageChange}
                    /> */}
                    {/* <label className="custom-file-upload"> */}
                        <input label="upload file" type='file' onChange={this.handleFileUpload} />
                        {/* Choose File */}
                    {/* </label> */}
                    <TextField
                        variant="outlined"
                        label="Capacity"
                        placeholder="Capacity"
                        margin="normal"
                        onChange={this.handleCapacityChange}
                    />
                    <TextField
                        variant="outlined"
                        label="Venue"
                        placeholder="Venue"
                        margin="normal"
                        onChange={this.handleVenueChange}    
                    />
                    <Button 
                        className="add-event-submit" 
                        onClick={this.handleClick}
                        variant="contained"
                        color="primary">
                        Submit
                    </Button>
            </form>
        )
    }
}

export default connect()(EventForm)
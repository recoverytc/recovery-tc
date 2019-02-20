import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import './EventForm.css';
import axios from 'axios';
import swal from 'sweetalert'

class EventForm extends Component {
    state = {
        title: '',
        date: '',
        time: '',
        address: '',
        description: '',
        image: '',
        capacity: null,
        venue: '',
        file: null,
    }

    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    handleDateChange = (event) => {
        this.setState({
            date: event.target.value
        })
    }
    handleTimeChange = (event) => {
        this.setState({
            time: event.target.value
        })
    }
    handleAddressChange = (event) => {
        this.setState({
            address: event.target.value
        })
    }
    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    handleImageChange = (event) => {
        this.setState({
            image: event.target.value
        })
    }
    handleCapacityChange = (event) => {
        this.setState({
            capacity: event.target.value
        })
    }
    handleVenueChange = (event) => {
        this.setState({
            venue: event.target.value
        })
    }

    autofillForm = () => {
        this.setState({
        title: 'Camp Cope Gig',
        date: '2019-05-23',
        time: '19:30',
        address: '1601 University Ave, St. Paul, MN 55104',
        description: 'THIS GIG IS AT A BAR, we understand if you\'re hesitant, please feel free to contact me beforehand, or find me at the show.',
        capacity: '50',
        venue: 'The Turf Club',
        })
        console.log('EWRNVEWRNVWLEVN');
    }


    handleClick = () => {
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
            this.props.history.push(`/home`);
        }).catch(error => {
            // handle your error
            console.log(error);
          });
          swal("Event Posted!", "You have successfully created an event!", "success");
    }

    handleFileUpload = (event) => {
        this.setState({ file: event.target.files });
        console.log(this.state.files);
    }

    render() {
        return (
            <form className="form-container">
                <h1 className="form-title" onClick={() => this.autofillForm()}>Add an Event</h1>
                <TextField
                    variant="outlined"
                    label="Title"
                    placeholder="Title"
                    value={this.state.title}
                    margin="normal"
                    className="input"
                    inputProps={{ maxLength: 60 }}
                    onChange={this.handleTitleChange}
                />
                <TextField
                    variant="outlined"
                    value={this.state.date}
                    type="date"
                    margin="normal"
                    onChange={this.handleDateChange}
                />
                <TextField
                    variant="outlined"
                    type="time"
                    value={this.state.time}
                    margin="normal"
                    onChange={this.handleTimeChange}
                />
                <TextField
                    variant="outlined"
                    label="Venue"
                    placeholder="Venue"
                    value={this.state.venue}
                    margin="normal"
                    inputProps={{ maxLength: 200 }}
                    onChange={this.handleVenueChange}
                />
                <TextField
                    label="Address"
                    variant="outlined"
                    value={this.state.address}
                    placeholder="Address"
                    margin="normal"
                    inputProps={{ maxLength: 300 }}
                    onChange={this.handleAddressChange}
                />
                <TextField
                    id="outlined-with-placeholder"
                    label="Description"
                    multiline
                    value={this.state.description}
                    rows="5"
                    fullWidth
                    margin="normal"
                    variant="outlined"
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
                        // label="Capacity"
                        placeholder="Capacity"
                        margin="normal"
                        value={this.state.capacity}
                        onChange={this.handleCapacityChange}
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
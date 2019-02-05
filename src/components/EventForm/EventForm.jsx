import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'


class EventForm extends Component {
    state = {
        title : '',
        date : '',
        time : '',
        address : '',
        description : '',
        image : '',
        capacity : null,
        venue: ''
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
        this.props.dispatch({type: 'ADD_EVENT', payload: this.state})
    }
    render() {
        return (
            <div>
                <div>
                    <TextField
                        label="Title"
                        placeholder="Title"
                        margin="normal"
                        onChange={this.handleTitleChange}
                    />
                </div>
                <div>
                    <TextField 
                    type="date"
                    margin="normal"
                    onChange={this.handleDateChange}
                    />
                </div>
                <div>
                    <TextField 
                    type="time"
                    margin="normal"
                    onChange={this.handleTimeChange}
                    />
                </div>
                <div>
                    <TextField
                        label="Address"
                        placeholder="Address"
                        margin="normal"
                        onChange={this.handleAddressChange}
                    
                    />
                </div>
                <div>
                    <TextField
                        label="Description"
                        placeholder="Description"
                        margin="normal"
                        onChange={this.handleDescriptionChange}
                    />
                </div>
                <div>
                    <TextField
                        label="Image Url"
                        placeholder="Image Url"
                        margin="normal"
                        onChange={this.handleImageChange}
                    />
                </div>
                <div>
                    <TextField
                        label="Capacity"
                        placeholder="Capacity"
                        margin="normal"
                        onChange={this.handleCapacityChange}
                    />
                </div>
                <div>
                    <TextField
                        label="Venue"
                        placeholder="Venue"
                        margin="normal"
                        onChange={this.handleVenueChange}    
                    />
                </div>
                <div>
                    <Button onClick={this.handleClick}>Submit</Button>
                </div>

            </div>
        )
    }
}

export default connect()(EventForm)
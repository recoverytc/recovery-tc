import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


class FileUpload extends Component {
  constructor () {
    super();
    this.state = {
      file: null
    };
  }

  submitFile = (event) => {
    event.preventDefault();
    console.log(this.state.file[0]);
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    axios.post(`api/imageUpload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {

      }).catch(error => {
        // handle your error
        console.log(error);
      });

  }

  handleFileUpload = (event) => {
    this.setState({file: event.target.files});
    console.log(this.state.files);
  }

  render () {
    return (
      <form onSubmit={this.submitFile}>
        <input label='upload file' type='file' onChange={this.handleFileUpload} />
        <button type='submit'>Send</button>
      </form>
    );
  }
}

export default connect()(FileUpload);
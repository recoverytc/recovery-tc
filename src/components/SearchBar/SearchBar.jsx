import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './SearchBar.css';

class SearchBar extends Component {
    state = {
        title: ''
    }

    handleChange = (event) =>{
        this.setState({
            title : event.target.value
        })
    }
    handleClick = (event) =>{
        event.preventDefault()
        console.log(this.state);
        this.props.dispatch({type: 'SEARCH_EVENT' , payload: this.state.title})
        console.log(this.state.title)
        this.props.history.push(`/search/results/${this.state.title}`)
    }


    render(){
       return(
           <div className="search-container">
           <h3>Search Events</h3>
               <form className="search-bar">
               {/* <label for="search">Search Events:</label> */}
                   <input className="search" name="search" onChange={this.handleChange} type="text" placeholder="Search Events"/>
                   <Button className="submit" onClick={this.handleClick} type="submit">
                    Search
                   </Button>
               </form>
           </div>
       )
    }
}
const mapStateToProps = (reduxStore) =>{
    return{
        reduxStore
    }
}

export default connect(mapStateToProps)(withRouter(SearchBar))
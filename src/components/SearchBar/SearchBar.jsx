import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

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
        this.props.history.push('/search/results')
    }


    render(){
       return(
           <div>
               <form>
                   <input onChange={this.handleChange} type="text" placeholder="Search Events"/>
                   <input onClick={this.handleClick} type="submit"/>
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
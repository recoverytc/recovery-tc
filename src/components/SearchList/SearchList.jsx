import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import Paper from '@material-ui/core/Paper'
import { Link, withRouter } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar'
import Button from '@material-ui/core/Button'

class SearchList extends Component{

handleClick = () =>{
    this.props.history.push('/home')
}
    render(){

        return(
            <div>
                <Button onClick={this.handleClick} >Back</Button>
                <SearchBar />
                {this.props.reduxStore.searchList.map(event =>{
                    return <div key={event.id}>  <Paper className="paper">
                    <div>
                      <h2>{event.title}</h2>
                        <p>{moment(event.date).format("MMM Do YYYY")}</p>
                        <p>{moment(event.time, "HH:mm").format("hh:mm A")}</p>
                    </div>
                    <div>
                        <Link to={`/events/${event.id}`}>
                          <img src={event.image} alt="picture" className="image-url" />
                        </Link>
                    </div>
                    </Paper>
                    </div>
                })}
            </div>
        )
    }
}
const mapStateToProps = (reduxStore) =>{
    return {
        reduxStore
    }
}

export default connect(mapStateToProps)(withRouter(SearchList))
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import './EventPage.css'

const styles = theme =>({
    root : {
        [theme.breakpoints.up('xs')]: {
        backgroundColor: 'yellow',
        }
    }
})

class EventPage extends Component {
    render(){
        const {classes} = this.props
        return(
            <div className={classes.root} >
                <img  className="imagebox" src="https://www.readingviaduct.org/wp-content/uploads/2018/06/Schaefer-Park-Playground-1024x675.jpg" alt="nothing"/>
                <button className="attendButton">Attend</button>
            </div>
        )
    }
}
const mapStateToProps = (reduxStore) =>{
    return{ 
        reduxStore
    }
}

export default connect()(withStyles(styles)(EventPage))
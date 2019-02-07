import React, { Component } from 'react';
import { connect } from 'react-redux';






class CaptainEditEvent extends Component {

    state = {
        open : this.props.open
    }
   
    handleEdit = () =>{
        this.setState({
            open : true
        })
    }
    handleClose = () =>{
        this.setState({
            open : false
        })
    }
    // handleClickClose = () =>{
    //     this.setState({
    //         open : false
    //     })
    // }
    // handleCancelClose = () =>{
    
    // }
    render(){
       return(
           <div>

           </div>
       )
    }
}
const mapStateToProps = (reduxStore) =>{
    return{
        reduxStore
    }
}

export default connect()(CaptainEditEvent)
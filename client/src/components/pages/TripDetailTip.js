import React, { Component } from 'react';
import api from '../../api';
// import './Sample.css';

class TripDetailTip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDeleted: false,
    }
  }

  handleDelete(tipId) {
    let id = this.props.id

    api.deleteTip(tipId, id)
    .then(tipDoc => {
      console.log("debug frontent tipDelete", tipDoc)
      this.setState({
        isDeleted: true
      })
      this.props.onDelete(tipDoc) 
    }
    ) 
  }

  render() {
    return (
      <div className="TripDetailTip">
         <div  key={this.props.tipId}> 
                <ul>
                <li>Title: {this.props.title}</li>
                <li>Description: {this.props.description}</li>
                <li>Location: {this.props.location}</li>
                <button onClick={() => this.handleDelete(this.props.tipId)}>Delete</button>
                </ul>
            </div>
      
      </div>
    );
  }
}

export default TripDetailTip;

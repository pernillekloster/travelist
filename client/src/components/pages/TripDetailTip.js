import React, { Component } from 'react';
import { Button } from 'reactstrap';
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
      <div >
         <div  className="TripDetailTip" key={this.props.tipId}> 
                <p>Title: {this.props.title}</p>
                <p>Description: {this.props.description}</p>
                <p>Location: {this.props.location}</p>
                <button className="btn btn-trip-detail-delete" onClick={() => this.handleDelete(this.props.tipId)}>Delete</button>
          </div>
      
      </div>
    );
  }
}

export default TripDetailTip;

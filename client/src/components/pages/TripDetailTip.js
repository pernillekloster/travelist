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
    .then(updateTrip =>
      this.setState({
        isDeleted: true
      })
    ) 
  }

  render() {
    return (
      <div className="TripDetailTip">
      {this.state.isDeleted && <div className="Btn-Tip-Added">Tip deleted</div>}
      {!this.state.isDeleted && 
         <div  key={this.props.tipId}> 
                <ul>
                <li>Category: {this.props.category}</li>
                <li>Title: {this.props.title}</li>
                <li>Description: {this.props.description}</li>
                <li>Location: {this.props.location}</li>
                <button onClick={() => this.handleDelete(this.props.tipId)}>Delete</button>
                </ul>
            </div>
      }
      </div>
    );
  }
}

export default TripDetailTip;

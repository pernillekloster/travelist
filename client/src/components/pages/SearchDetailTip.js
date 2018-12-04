import React, { Component } from 'react';
import api from '../../api';
// import './Sample.css';

class SearchDetailTip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdded: false,
    }
  }

  handleAdd(tipId) {
    let id = this.props.id
    let friendTripId = this.props.friendTripId

    api.addTip(id, friendTripId, tipId)
    .then(updateTrip =>
      this.setState({
        isAdded: true
      })
    ) 
  }

  render() {
    return (
      <div className="SearchDetailTip">
      {this.state.isAdded && <div className="addedStatus">Whoop, Tip added to your trip!</div>}
      {!this.state.isAdded && 
         <div  className="TripDetailTip" key={this.props.tipId}> 
                <p><strong>Title:</strong> {this.props.title}</p>
                <p><strong>Description:</strong> <br/> {this.props.description}</p>
                <p><strong>Location:</strong> {this.props.location}</p>
                <button className="btn btn-trip-detail-addFriendsTip" color="#FAAD8D" onClick={() => this.handleAdd(this.props.tipId)}>Add</button>
        </div>
      }
      </div>
    );
  }
}

export default SearchDetailTip;

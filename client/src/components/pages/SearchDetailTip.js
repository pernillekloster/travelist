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
      {this.state.isAdded && <div className="Btn-Tip-Added">Tip added to your trip!</div>}
      {!this.state.isAdded && 
         <div  key={this.props.tipId}> 
                <ul>
                <li>Title: {this.props.title}</li>
                <li>Description: {this.props.description}</li>
                <li>Location: {this.props.location}</li>
                <button onClick={() => this.handleAdd(this.props.tipId)}>Add</button>
                </ul>
            </div>
      }
      </div>
    );
  }
}

export default SearchDetailTip;

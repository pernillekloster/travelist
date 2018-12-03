import React, { Component } from 'react';
import api from '../../api';
// import './Sample.css';

class SearchDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTrip: [],
      isAdded: false,
    }
  }

  handleAdd(tipId) {
    let id = this.props.match.params.id
    let friendTripId = this.props.match.params.friendTripId

    // In BE create copy of tip added and include that one in trip
    api.addTip(id, friendTripId, tipId)
    .then(updateTrip =>
      this.setState({
        isAdded: true
      })
    ) 
  }

  render() {
    console.log("debug render this.state.selectedTrip", this.state.selectedTrip)
    return (
      <div className="SearchDetail">

        <h2>Heres your friends tips and recos</h2>

        {/* Take the selected trip from the friend and display the included tips  */}
        {/* Change Tip Model to include isAdded status!! Otherwise all tips will disappear once added */}
        <div>
        {this.state.isAdded && <div className="Btn-Tip-Added">Gone</div>}
        
        {!this.state.isAdded && 
          this.state.selectedTrip.map(e => 
      
              e.tripData._tip.map(t =>
           
              <div  key={t._id}> 
                  <p>{t.title}</p>
                  <ul>
                  <li>{t.category}</li>
                  <li>{t.description}</li>
                  <li>{t.location}</li>
                  <button onClick={() => this.handleAdd(t._id)}>Add</button>
                  </ul>
                  <br/>
              </div>
              )
          )
       }
        </div>

      </div>
    );
  }

  componentDidMount() {
    let id = this.props.match.params.id
    let friendTripId = this.props.match.params.friendTripId

    api.getSelectedFriendsTrip(id, friendTripId)
      .then(trip=> {
        this.setState({
          selectedTrip: [trip],
        })
      })
      .catch(err => console.log(err))
  }
}

export default SearchDetail;
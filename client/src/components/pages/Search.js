import React, { Component } from 'react';
import api from '../../api';
// import './Sample.css';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tripId: "",
      destination: "",
      trips: []
    }
  }

  handleTrip(idFriendTrip) {
    // Redirects the user to '/search/'+ id of the selected trip
    this.props.history.push('/search/'+ this.state.tripId +"/" +idFriendTrip)
  }

  render() {
    return (
      <div className="Search">
        <h2>These friends have been to {this.state.destination} as well:</h2>
        {this.state.trips.map(t => 
        <div> 
          <li key={t._id}>{t._creator.username}</li>
          <button onClick={() => this.handleTrip(t._id)}>View this trip</button>
        </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    let id = this.props.match.params.id

    api.getFriendsTrips(id)
      .then(matchedTrips=> {
        this.setState({
          // Set tripId to id of users trip
          tripId: id,
          // Set state of trips to all trips that match search criteria (place and following)
          trips: matchedTrips,
          // Set destination to users chosen destination to display in headline
          destination: matchedTrips[0].destination,
        })
      })
      .catch(err => console.log(err))
  }
}

export default Search;
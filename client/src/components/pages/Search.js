import React, { Component } from 'react';
import api from '../../api';
import { Button } from 'reactstrap';
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
        <h4>These friends have been to {this.state.destination} as well:</h4>
        {this.state.trips.map(t => 
        <div> 
          <p key={t._id}>{t._creator.username}</p>
          <Button color="primary" onClick={() => this.handleTrip(t._id)}>View this trip</Button>
        </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    // id of users trip
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

import React, { Component, Link } from 'react';
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

  goBack = () => {
    let id = this.props.match.params.id
    this.props.history.push('/trip-detail/'+ id )
  }

  goToUserProfile = () => {
    this.props.history.push("/user-profile" )
  }

  getTripColor(trip) {
    let colors = ['#1F5B66', '#257888', '#6E9FA8']
    let colorIndex = parseInt("0x" + trip._id.substr(-10)) % colors.length
    return colors[colorIndex]
  }

  render() {
    let id = this.state.tripId
    return (
      <div className="Search">

        <div className="back-btn" onClick={this.goBack}>
        <img className="back-btn-img" src="../../../images/back.png"/>
        </div>


        {this.state.trips.length === 0 && 
        <div className="noFriendsYet-box"> 
          <h4 className="homeHeader">
          None of your friends have been<br/> to {this.state.destination} <br/>
          <br/><button className="link-to-user-profile" onClick={this.goToUserProfile}>Find other TraveListers</button> <br/>
          {/* to follow others for inspiration */}
          </h4>
        </div>
        }

        {this.state.trips.length > 0 && 
        <div className="homeboxesSearch">
          <h4 className="homeHeader">Your friends' trips to {this.state.destination}</h4>
          {this.state.trips.map((t) => (
              <Button className="destinationboxSearch" key={t._id} style={{ backgroundColor: this.getTripColor(t) }} 
              onClick={() => this.handleTrip(t._id)}>
                <a className="link-to-detailed-trip-search" style={{color: 'white'}}>{t._creator.username}</a>
              </Button>
          ))}
        </div>
        }

      </div>
    );
  }

  componentDidMount() {
    // id of users trip
    let id = this.props.match.params.id

    api.getTrip(id) 
    .then(tripDoc => {
      this.setState({
        // Set destination to users chosen destination to display in headline
        destination: tripDoc.destination
      })
    })

    api.getFriendsTrips(id)
      .then(matchedTrips=> {
        this.setState({
          // Set tripId to id of users trip
          tripId: id,
          // Set state of trips to all trips that match search criteria (place and following)
          trips: matchedTrips,
        })
      })
      .catch(err => console.log(err))
  }
}

export default Search;

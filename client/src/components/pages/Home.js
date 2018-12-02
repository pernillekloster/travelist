import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import api from '../../api'
import AddedTips from './AddedTips'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      destination: ""
    };
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
    this.setState(newState)
  }

  handleClick(e){
    e.preventDefault()
    let data = {
      destination: this.state.destination
    }
    api.postTrip(data)
    .then(newTrip => {
      console.log('SUCCESS, debug newTrip', newTrip);
      this.setState({
        trips: [...this.state.trips, newTrip],
        destination: ""
      })
      console.log("debug update trips", this.state.trips)
    }) 
    .catch(err => console.log(err))
  }

  componentDidMount() {
    api.getUserTrips()
      .then(trips => {
        this.setState({
          trips: trips,
          destination: ""
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
       <div>
      <table style={{margin: 'auto'}}>  
            <Link to={AddedTips}>{this.state.trips.map(t => (
              <div>
              <hr/>
                <tr key={t._id}>
                <th>{t.destination}</th>
              </tr>
            </div>
            ))}
            </Link>
        </table>
      <form>
      <input type="text" style={{border: 'solid'}} value={this.state.destination} onChange={(e) => { this.handleInputChange("destination", e) }}/>
      <Button onClick={(e)=> this.handleClick(e)}> Add destination </Button>
      </form>
      </div>
    );
  }
}


export default Home;
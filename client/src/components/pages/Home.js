import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Route, NavLink, Switch } from 'react-router-dom';
import api from '../../api'
import AddTip from './AddTip'
import TripDetail from './TripDetail'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      modal: false,
      // tripsColors: [],
      destination: "",
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
    this.setState(newState)
  }

  addTrip = (e) => {
    e.preventDefault()
    let data = {
      destination: this.state.destination
    }
    api.postTrip(data)
      .then(newTrip => {
        this.setState({
          trips: [...this.state.trips, newTrip],
          // tripsColors: [...this.state.tripsColors, this.generateRandomColor()],
          destination: "",
          modal: false
        })
      })
      .catch(err => console.log(err))
  }

  // generateRandomColor() {
  //   let colors = ['#1F5B66', '#257888', '#6E9FA8']
  //   return colors[Math.floor(colors.length*Math.random())]
  // }

  getTripColor(trip) {
    let colors = ['#1F5B66', '#257888', '#6E9FA8']
    let colorIndex = parseInt("0x" + trip._id.substr(-10)) % colors.length
    return colors[colorIndex]
  }

  componentDidMount() {
    api.getUserTrips()
      .then(trips => {
        this.setState({
          trips: trips,
          destination: "",
          // tripsColors: trips.map(trip => this.generateRandomColor())
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
      <h4 className="homeHeader">Where is your next destination?</h4>
      <div className="allBoxes" >
      <div className="homeboxes">

      <div>
        <div className="destinationbox" style={{ backgroundColor: "#257888", opacity: 0.3}}>
        <Button className="btn btn-add-trip " onClick={this.toggle}>
            <img className="plusicon" src="../../../images/plusSign.png" />
        </Button>
        </div>
      </div>

        {/* <Button className="btn btn-add-trip" onClick={this.toggle}>Add new tip</Button> */}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className="important-header modalHeader" toggle={this.toggle}>Add your new destination</ModalHeader>
          <form>
            <ModalBody className="detail-size modalBody">
          <div className="inputCategoryTrip">

            <input className="inputAddTip" type="text" Placeholder="Destination" style={{ border: 'solid' }} value={this.state.destination} onChange={(e) => this.handleInputChange("destination", e)} /> <br />
            </div>
              <Button className="btn btn-trip-detail-saveTip" color="#1F5B66" onClick={this.addTrip}>Save trip</Button>{' '}
            </ModalBody>
          </form>
        </Modal>


        {/* <div className="homeboxes" style={{ margin: 'auto' }}> */}
          {this.state.trips.map((t, i) => (
            <Link to={`trip-detail/${t._id}`}> 
            <div className="destinationbox" key={i} style={{ backgroundColor: this.getTripColor(t) }}>
              <a className="link-to-detailed-trip" style={{color: 'white'}}>{t.destination}</a>
            </div>
            </Link>
          ))}
        {/* </div> */}

      </div>
      </div>
      </div>
    );
  }
}


export default Home;
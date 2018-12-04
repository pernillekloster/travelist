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

  addTrip=(e)=> {
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
    let colorIndex = parseInt("0x"+trip._id.substr(-10)) % colors.length
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

        <Button className="btn btn-add-trip" onClick={this.toggle}>Add new tip</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add your new destination</ModalHeader>
          <form>
          <ModalBody>
            Destination: <input type="text" style={{border: 'solid'}} value={this.state.destination} onChange={(e) => this.handleInputChange("destination", e)} /> <br/>
            <Button color="primary" onClick={this.addTrip}>Save trip</Button>{' '}
          </ModalBody>
          </form>
        </Modal> 



        <form>
          <input type="text" value={this.state.destination} onChange={(e) => { this.handleInputChange("destination", e) }} />
          <Button onClick={this.addTrip}> Add destination </Button>
        </form>
        <div className="destinationbox1" style={{backgroundColor: "#257888",opacity: 0.3}}>
        <NavLink to="/" exact >
        <div  className="plusicon">
        <img src="../../../images/plusSign.png"/>
      </div>
      </NavLink>
        </div>
        <div style={{ margin: 'auto' }}>
          {this.state.trips.map((t,i) => (
            <div className="destinationbox" key={i}   style={{backgroundColor: this.getTripColor(t)}}>
              {/* <tr key={t._id}> */}
              <Link to={`trip-detail/${t._id}`}> <a>{t.destination}</a></Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}


export default Home;
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import api from '../../api'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      allTrips: [],
      modal: false,
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

  chooseDestination(e, chosenDestination) {
    e.preventDefault()
    this.setState({
      destination: chosenDestination
    })
  }

  getTripColor(trip) {
    let colors = ['#1F5B66', '#257888', '#6E9FA8']
    let colorIndex = parseInt("0x" + trip._id.substr(-10)) % colors.length
    return colors[colorIndex]
  }

  componentDidMount() {
    api.getTrips()
      .then(allTrips => {
        console.log("debug frontend addtripsearch", allTrips)
        this.setState({
          allTrips: allTrips,
        })
      })
    api.getUserTrips()
      .then(trips => {
        this.setState({
          trips: trips,
          destination: "",
        })
      })
      .catch(err => console.log(err))
  }

  render() {

    // Remove duplicates from code
    let array = []
    for (let i = 0; i < this.state.allTrips.length; i++) {
      if (!array.includes(this.state.allTrips[i].destination)) {
        array.push(this.state.allTrips[i].destination)
      }
    }

    // Filter cities based on search query
    const filteredArr = array
      .filter(t => 
          t.toLowerCase().includes(this.state.destination.toLowerCase())
        )
      .sort()
    // Passed on to render
    
  
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

        
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className="important-header modalHeader" toggle={this.toggle}>Add your new destination</ModalHeader>
          <form>
            <ModalBody className="detail-size modalBody">
            
            <div className="inputCategoryTrip">
              <input className="inputAddTip" type="text" placeholder="Destination" style={{ border: 'solid' }} value={this.state.destination} onChange={(e) => this.handleInputChange("destination", e)} /> <br />
            </div>

            <Table>
            <tbody>
              {filteredArr
              .map((t, i) => (
                <tr key={"t"-i} className="create-trip-search">
                  <button className="create-trip-search"  onClick={(e) => this.chooseDestination(e, t)}>{t}</button>
                </tr>
              ))}
             </tbody>
            </Table>

              <Button className="btn btn-trip-detail-saveTip" color="#1F5B66" onClick={this.addTrip}>Save trip</Button>{' '}
            </ModalBody>
          </form>
        </Modal>


        
          {this.state.trips.map((t, i) => (
            <Link to={`trip-detail/${t._id}`}> 
            <div className="destinationbox" key={i} style={{ backgroundColor: this.getTripColor(t) }}>
              <a className="link-to-detailed-trip" style={{color: 'white'}}>{t.destination}</a>
            </div>
            </Link>
          ))}
      

      </div>
      </div>
      </div>
    );
  }
}


export default Home;
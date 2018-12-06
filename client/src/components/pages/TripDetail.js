import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import api from '../../api';
import AddTip from './AddTip';
import { Link } from 'react-router-dom'
import TripDetailTip from "./TripDetailTip"

class TripDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      collapse: false, 
      title: "",
      destination: "",
      selectedTrip: [],
      tips: [],
      location: "",
      description: "",
      category: "",
      categoryBtn: "",
      istDeleted: false,
      trips: []
    };
  }

  addTip(tip) {
    this.setState({
      tips: [...this.state.tips, tip]
    })
  }

  deleteTip(tip) {
    let newTipArr = this.state.tips.filter(t => t._id != tip._id)
    this.setState({
      tips: newTipArr
    })
  }

  toggle  = (categoryBtn) => {
    this.setState({ 
      categoryBtn: categoryBtn,
      collapse: !this.state.collapse 
    });
  }

   async handleDelete() {
     let id = this.props.match.params.id
    await api.deleteTrip(id)
    .then(updateTrip =>
      this.setState({
        isDeleted: true
      })
    ) 
    this.props.history.push('/home');
  }


  render() {
    let id = this.props.match.params.id
    const tipArray = []

    let tips = this.state.tips.sort((a,b) => (a.category > b.category ? 1 : -1))

    // Push filtered Tips into array
    let filteredTips = tips.filter(t => {
      return t.category === this.state.categoryBtn
    }) 

    for (let i = 0; i < filteredTips.length; i++) {
      tipArray.push(
        <Collapse isOpen={this.state.collapse}>
          <Card className="TripDetailTipCard">
            <CardBody className="TripDetailTipCardBody">
              <TripDetailTip 
              tipId={filteredTips[i]._id} 
              title={filteredTips[i].title} 
              category={filteredTips[i].category}
              description={filteredTips[i].description} 
              location= {filteredTips[i].location} 
              id={this.props.match.params.id}
              onDelete={tip => this.deleteTip(tip)}
              destination={this.state.selectedTrip.destination}
              // tips={this.state.tips}
              />
            </CardBody>
          </Card>
          </Collapse>
        )
    }

    tipArray.push(
      <div>
      <Collapse isOpen={this.state.collapse}>
        <AddTip 
        id={this.props.match.params.id}
        onAdd={tip => this.addTip(tip)}
        destination={this.state.selectedTrip.destination}
        category={this.state.categoryBtn}
        />
      </Collapse>
      </div>
    )

    return (
      <div>

        <h4 className="homeHeader">Your saved tips for {this.state.destination}</h4>

        <Button className="btn btn-trip-detail-dd" color="#6E9FA8" onClick={() => this.toggle("food & drinks")} style={{ marginBottom: '1rem' }}>Food & Drinks</Button>
        <div>
        {this.state.categoryBtn === "food & drinks" && tipArray}
        </div>

        <Button className=" btn btn-trip-detail-dd" color="#6E9FA8" onClick={() => this.toggle("activities")} style={{ marginBottom: '1rem' }}>Activities</Button>
        <div>
        {this.state.categoryBtn === "activities" && tipArray}
        </div>

        <Button className="btn btn-trip-detail-dd" color="#6E9FA8" onClick={() => this.toggle("where to stay")} style={{ marginBottom: '1rem' }}>Where to stay</Button>
        <div>
        {this.state.categoryBtn === "where to stay" && tipArray}
        </div>
        
        <br/>
        <div>
          <Button className="btn-trip-detail-search" color="#1F5B66">
          <Link className="btn-trip-detail-search" to={`search/${id}`}>Your friends' tips for {this.state.destination}</Link>
          </Button>
        </div>

          <div className="stickyFooter">
          <Button className="stickyFooter" color="white" onClick={() => this.handleDelete(this.props.id)}> Delete this trip </Button>
          </div>

      </div>
    );
  }

  componentDidMount() {
    let id = this.props.match.params.id

    api.getTrip(id)
      .then(trip => {
        this.setState({
          selectedTrip: trip,
          destination: trip.destination
        })
      })
    api.getTips(id)
      .then(tips => {
        this.setState({
          tips: tips
        })
      })
      .catch(err => console.log(err))
  }

}

export default TripDetail;
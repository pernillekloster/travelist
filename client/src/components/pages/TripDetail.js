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
          <Card className="TripDetailTipCard" color=" rgba(31, 91, 102, 0.3)">
            <CardBody>
              <TripDetailTip 
              tipId={filteredTips[i]._id} 
              title={filteredTips[i].title} 
              category={filteredTips[i].category}
              description={filteredTips[i].description} 
              location= {filteredTips[i].location} 
              id={this.props.match.params.id}
              onDelete={tip => this.deleteTip(tip)}
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

        <p>Here are your saved tips for {this.state.destination}</p>

        <Button className="btn btn-trip-detail-dd" color="#1F5B66" onClick={() => this.toggle("food & drinks")} style={{ marginBottom: '1rem' }}>Food & Drinks</Button>
        <div>
        {this.state.categoryBtn === "food & drinks" && tipArray}
        </div>

        <Button className="btn btn-trip-detail-dd" color="#1F5B66" onClick={() => this.toggle("activities")} style={{ marginBottom: '1rem' }}>Activities</Button>
        <div>
        {this.state.categoryBtn === "activities" && tipArray}
        </div>

        <Button className="btn btn-trip-detail-dd" color="#1F5B66" onClick={() => this.toggle("where to stay")} style={{ marginBottom: '1rem' }}>Where to stay</Button>
        <div>
        {this.state.categoryBtn === "where to stay" && tipArray}
        </div>
        
        <br/>
        <div>
          <Button className="btn btn-trip-detail-search" color="#1F5B66">
          <Link className="btn-trip-detail-search" to={`search/${id}`}>See your friends' tips for {this.state.destination}</Link>
          </Button>
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
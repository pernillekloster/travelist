import React, { Component } from 'react';
import api from '../../api';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import SearchDetailTip from "./SearchDetailTip"
// import './Sample.css';

class SearchDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      destination: "",
      selectedTrip: [],
      tips: [],
      isAdded: false,
      collapse: false, 
      category: "",
    }
  }

  toggle  = (category) => {
    this.setState({ 
      category: category,
      collapse: !this.state.collapse 
    });
  }
  
  render() {
    
    const categories = []
    const tipArray = []

    let tips = this.state.tips.sort((a,b) => (a.category > b.category ? 1 : -1))
    
    // Push categories to array
    // for (let i = 0; i < tips.length; i++) {
    // if (i === 0 || tips[i].category !== tips[i-1].category) {
    //   categories.push(
    //   <Button className="btn btn-trip-detail-dd" color="#6E9FA8" onClick={() => this.toggle(tips[i].category)} style={{ marginBottom: '1rem' }}>{tips[i].category}</Button>
    //   )}
    // }

    // Push filtered Tips into array
    let filteredTips = tips.filter(t => {
      return t.category === this.state.category
    }) 
   
    for (let i = 0; i < filteredTips.length; i++) {
      tipArray.push(
        <Collapse isOpen={this.state.collapse}>
          <Card className="TripDetailTipCard">
            <CardBody className="TripDetailTipCardBody">
              <SearchDetailTip 
              tipId={filteredTips[i]._id} 
              title={filteredTips[i].title} 
              category={filteredTips[i].category}
              description={filteredTips[i].description} 
              location= {filteredTips[i].location} 
              id={this.props.match.params.id}
              friendTripId={this.props.match.params.friendTripId}
              />
            </CardBody>
          </Card>
          </Collapse>
        )
      }
 
    // Check why destination display isnt working anymore  
    return (
      <div className="SearchDetail">
        <p className="site-heading">Your friends' tips for {this.state.destination}:</p>

        <Button className="btn btn-trip-detail-dd" color="#6E9FA8" onClick={() => this.toggle("food & drinks")} style={{ marginBottom: '1rem' }}>Food & Drinks</Button>
        <div>
        {this.state.category === "food & drinks" && tipArray}
        </div>

        <Button className=" btn btn-trip-detail-dd" color="#6E9FA8" onClick={() => this.toggle("activities")} style={{ marginBottom: '1rem' }}>Activities</Button>
        <div>
        {this.state.category === "activities" && tipArray}
        </div>

        <Button className="btn btn-trip-detail-dd" color="#6E9FA8" onClick={() => this.toggle("where to stay")} style={{ marginBottom: '1rem' }}>Where to stay</Button>
        <div>
        {this.state.category === "where to stay" && tipArray}
        </div>

        {/* <div>{categories}</div>
        <div>{tipArray}</div> */}
      </div>
    );
  }

  componentDidMount() {
    let id = this.props.match.params.id
    let friendTripId = this.props.match.params.friendTripId

    api.getTips(friendTripId)
     .then(friendTips => {
       this.setState({
         tips: friendTips
       })
     })
    api.getSelectedFriendsTrip(id, friendTripId)
      .then(trip=> {
        this.setState({
          selectedTrip: trip,
          destination: trip.tripData.destination,
        })
      })
      .catch(err => console.log(err))
  }

}

export default SearchDetail;

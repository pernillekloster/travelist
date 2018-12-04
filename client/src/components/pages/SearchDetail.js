import React, { Component } from 'react';
import api from '../../api';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import SearchDetailTip from "./SearchDetailTip"
// import './Sample.css';

class SearchDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    
    console.log("debug state category", this.state.category )
    const categories = []
    const tipArray = []
    // const destination = this.state.selectedTrip.tripData.destination

    let tips = this.state.tips.sort((a,b) => (a.category > b.category ? 1 : -1))
    
    // Push categories to array
    for (let i = 0; i < tips.length; i++) {
    if (i === 0 || tips[i].category !== tips[i-1].category) {
      categories.push(
      <Button color="primary" onClick={() => this.toggle(tips[i].category)} style={{ marginBottom: '1rem' }}>{tips[i].category}</Button>
      )}
    }

    // Push filtered Tips into array
    let filteredTips = tips.filter(t => {
      return t.category === this.state.category
    }) 
   
    for (let i = 0; i < filteredTips.length; i++) {
      tipArray.push(
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
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
        <h4>Here are your friends' tips and recos for {this.state.selectedTrip.destination}</h4>
        <div>{categories}</div>
        <div>{tipArray}</div>
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
       console.log("debug tips", this.state.tips)
     })
    api.getSelectedFriendsTrip(id, friendTripId)
      .then(trip=> {
        this.setState({
          selectedTrip: trip,
        })
        console.log("debug selectedTrip", this.state.selectedTrip)
      })
      .catch(err => console.log(err))
  }

}

export default SearchDetail;

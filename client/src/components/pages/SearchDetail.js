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

    this.state.selectedTrip.map(e => {
    // Sort tips of trips based on category
    let tips = e.tripData._tip.sort((a,b) => (a.category > b.category ? 1 : -1))
    
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
    console.log("debug filteredTips", filteredTips)
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
        console.log("debug tipArray", tipArray)
      }
  })
 
    return (
      <div className="SearchDetail">
        <h2>Here are your friends' tips and recos</h2>
        {/* Take the selected trip from the friend and display the included tips */}
        <div>{categories}</div>
        <div>{tipArray}</div>
      </div>
    );
  }

  componentDidMount() {
    let id = this.props.match.params.id
    let friendTripId = this.props.match.params.friendTripId

    api.getSelectedFriendsTrip(id, friendTripId)
      .then(trip=> {
        this.setState({
          selectedTrip: [trip],
        })
      })
      .catch(err => console.log(err))
  }

}

export default SearchDetail;

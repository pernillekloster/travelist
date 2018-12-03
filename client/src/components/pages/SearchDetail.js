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
      // collapse: false, 
      collapseFood: false, 
      collapseActivities: false,
      collapseStay: false,
    }
  }

  toggle  = (category) => {
    console.log("debug button clicked", category)
    // this.setState({ collapse: !this.state.collapse });
    if (category === "food & drinks") {
      this.setState({ collapseFood: !this.state.collapseFood });
    }
    if (category === "activities") {
      this.setState({ collapseActivities: !this.state.collapseActivities })
    }
    if (category === "where to stay") {
      this.setState({ collapseStay: !this.state.collapseStay })
    }
  }

  render() {
    console.log("debug state food", this.state.collapseFood)
    console.log("debug state activities", this.state.collapseActivities)
    const tipCard = []

    this.state.selectedTrip.map(e => {
    // Sort tips of trips based on category
    let tips = e.tripData._tip.sort((a,b) => (a.category > b.category ? 1 : -1))
  
    // Push categories to array
    for (let i = 0; i < tips.length; i++) {
    if (i === 0 || tips[i].category !== tips[i-1].category) {
      tipCard.push(
      <Button color="primary" onClick={() => this.toggle(tips[i].category)} style={{ marginBottom: '1rem' }}>{tips[i].category}</Button>
      )}

    // Push each tip to array
      tipCard.push(
        // <Collapse isOpen={this.state.collapse}>
        <Collapse isOpen={this.state.collapseActivities || this.state.collapseFood || this.state.collapseStay}> 
        <Card>
          <CardBody>
            <SearchDetailTip 
            tipId={tips[i]._id} 
            title={tips[i].title} 
            description={tips[i].description} 
            location= {tips[i].location} 
            id={this.props.match.params.id}
            friendTripId={this.props.match.params.friendTripId}
            />
          </CardBody>
        </Card>
        </Collapse>
        ) 
    }
    })

    return (
      <div className="SearchDetail">

        <h2>Here are your friends' tips and recos</h2>

        {/* Take the selected trip from the friend and display the included tips */}
        <div>{tipCard}</div>

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

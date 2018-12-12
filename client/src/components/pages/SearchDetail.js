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
      friend: "",
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

  goToUserProfile = () => {
    this.props.history.push("/user-profile" )
  }

  goBack = () => {
    let id = this.props.match.params.id
    // Redirects the user to '/search/'+ id of the selected trip
    this.props.history.push('/trip-detail/search/'+ id )
  }
  
  render() {

    const tipArray = []

    let tips = this.state.tips.sort((a,b) => (a.category > b.category ? 1 : -1))

    // Push filtered Tips into array
    let filteredTips = tips.filter(t => {
      return t.category === this.state.category
    }) 
   
    for (let i = 0; i < filteredTips.length; i++) {
      tipArray.push(
        <Collapse key={i} isOpen={this.state.collapse}>
          <Card className="TripDetailTipCard">
            <CardBody className="TripDetailTipCardBody">
              <SearchDetailTip 
              key={i}
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

      const arrayLength = (category, array) => {
       let newArray= array.filter(e => {
          return e.category === category
        })
        return newArray.length > 0 ? true : false
      }
      
    // Check why destination display isnt working anymore  
    return (
      <div className="SearchDetail">

       <div className="back-btn" onClick={this.goBack}>
        <img className="back-btn-img" src="../../../images/back.png"/>
       </div>

      {this.state.tips.length === 0 &&
      <div className="noFriendsYet-box"> 
      <h4 className="homeHeader">
      {this.state.friend} doesn't have any tips <br/> for {this.state.destination} yet <br/>
      <br/><button className="link-to-user-profile" onClick={this.goToUserProfile}>Find other TraveListers</button> <br/>
      {/* to follow others for inspiration */}
      </h4>
    </div>
      }

      {this.state.tips.length > 0 &&
      <div>

        <h4 className="homeHeader">{this.state.friend}{this.state.friend.slice(-1) === "s" ? "'" : "'s"} tips for {this.state.destination}</h4>

        { arrayLength("food & drinks", this.state.tips) &&
        <Button className="btn btn-trip-detail-dd" color="#6E9FA8" onClick={() => this.toggle("food & drinks")} style={{ marginBottom: '1rem' }}>Food & Drinks</Button>
        }
        <div>
        {this.state.category === "food & drinks" && tipArray}
        </div>

        { arrayLength("activities", this.state.tips) &&
        <Button className=" btn btn-trip-detail-dd" color="#6E9FA8" onClick={() => this.toggle("activities")} style={{ marginBottom: '1rem' }}>Activities</Button>
        }
        <div>
        {this.state.category === "activities" && tipArray}
        </div>

        { arrayLength("where to stay", this.state.tips) &&
        <Button className="btn btn-trip-detail-dd" color="#6E9FA8" onClick={() => this.toggle("where to stay")} style={{ marginBottom: '1rem' }}>Where to stay</Button>
        }
        <div>
        {this.state.category === "where to stay" && tipArray}
        </div>
        </div>
      }
   
        
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
          friend: trip.tripData._creator.username
        })
      })
      .catch(err => console.log(err))
  }

}

export default SearchDetail;

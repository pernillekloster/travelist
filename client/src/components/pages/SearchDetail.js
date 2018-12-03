import React, { Component } from 'react';
import api from '../../api';
// import './Sample.css';

class SearchDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTrip: [],
      isAdded: false,
    }
  }

  handleAdd(tipId) {
    let id = this.props.match.params.id
    let friendTripId = this.props.match.params.friendTripId

    api.addTip(id, friendTripId, tipId)
    .then(updateTrip =>
      this.setState({
        isAdded: true
      })
    ) 
  }

  render() {
    console.log(this.state.selectedTrip)
    const tipCard = []

    this.state.selectedTrip.map(e => {
    // Sort tips of trips based on category
    let tips = e.tripData._tip.sort((a,b) => (a.category > b.category ? 1 : -1))

    // Push categories to array
    for (let i = 0; i < tips.length; i++) {
    if (i === 0 || tips[i].category !== tips[i-1].category) {
        tipCard.push(
        <p>{tips[i].category}</p>
        )}
    // Push each tip to array
    tipCard.push(
          <div  key={tips[i]._id}> 
                      <ul>
                      <li>{tips[i].title}</li>
                      <li>{tips[i].description}</li>
                      <li>{tips[i].location}</li>
                      <button onClick={() => this.handleAdd(tips[i]._id)}>Add</button>
                      </ul>
          </div>
      )
    }
    })

    return (
      <div className="SearchDetail">

        <h2>Here are your friends' tips and recos</h2>

        {/* Take the selected trip from the friend and display the included tips */}
        <div>
        {this.state.isAdded && <div className="Btn-Tip-Added">Gone</div>}

        {!this.state.isAdded && <div>{tipCard}</div>}
        </div>

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

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
          <Card>
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

        <h4>Here are your saved tips for {this.state.selectedTrip.destination}</h4>

        <Button color="primary" onClick={() => this.toggle("food & drinks")} style={{ marginBottom: '1rem' }}>Food & Drinks</Button>
        <div>
        {this.state.categoryBtn === "food & drinks" && tipArray}
        </div>

        <Button color="primary" onClick={() => this.toggle("activities")} style={{ marginBottom: '1rem' }}>Activities</Button>
        <div>
        {this.state.categoryBtn === "activities" && tipArray}
        </div>

        <Button color="primary" onClick={() => this.toggle("where to stay")} style={{ marginBottom: '1rem' }}>Where to stay</Button>
        <div>
        {this.state.categoryBtn === "where to stay" && tipArray}
        </div>

        {/* <div>
        <Collapse isOpen={this.state.collapse}>
          <AddTip 
          id={this.props.match.params.id}
          onAdd={tip => this.addTip(tip)}
          destination={this.state.selectedTrip.destination}
          />
        </Collapse>
        </div> */}
        
        <br/>
        <div>
          <Button color="danger">
          <Link to={`search/${id}`}>Search for friends´ tips</Link>
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
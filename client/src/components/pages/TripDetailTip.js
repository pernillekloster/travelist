import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import api from '../../api';
import EditTip from "./EditTip"
// import './Sample.css';

class TripDetailTip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDeleted: false,
      collapse: true, 
    }
  }

  handleDelete(tipId) {
    let id = this.props.id

    api.deleteTip(tipId, id)
    .then(tipDoc => {
      this.setState({
        isDeleted: true
      })
      this.props.onDelete(tipDoc) 
    }
    ) 
  }

  // editTip(tip) {
  //   this.setState({
  //     tips: [...this.state.tips, tip]
  //   })
  // }

  render() {
    return (
      <div >
         <div  className="TripDetailTip" key={this.props.tipId}> 
                <p><strong>Title</strong> <br/> {this.props.title}</p>
                <p><strong>Description</strong> <br/> {this.props.description}</p>
                <p><strong>Location</strong> <br/> {this.props.location}</p>

                <div className="trip-detail-buttons">
                  <div>
                    <Collapse isOpen={this.state.collapse}>
                      <EditTip 
                      onEdit={tip => this.editTip(tip)}
                      id={this.props.id}
                      tipId={this.props.tipId}
                      category={this.props.category}
                      destination={this.props.destination}
                      title={this.props.title}
                      location={this.props.location}
                      description={this.props.description}
                      />
                    </Collapse>
                  </div>
                <button className="btn btn-trip-detail-delete" onClick={() => this.handleDelete(this.props.tipId)}>Delete</button>
                </div>

          </div>
      
      </div>
    );
  }
}

export default TripDetailTip;

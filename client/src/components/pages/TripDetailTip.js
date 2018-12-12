import React, { Component } from 'react';
import { Collapse, Button } from 'reactstrap';
import api from '../../api';
import EditTip from "./EditTip"
// import './Sample.css';

class TripDetailTip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDoneFrontend: false,
      collapse: true, 
    }
  }

  handleDelete(tipId) {
    let id = this.props.id

    api.deleteTip(tipId, id)
    .then(tipDoc => {
      this.props.onDelete(tipDoc) 
    }
    ) 
  }

  handleIsDone(tipId){
  console.log("hey im not supposed to be called")
  let id = this.props.id
  
  api.markTipAsDone(tipId, id)
  .then (tipDoc => {
    this.props.onDone(tipDoc)
    this.setState({
      isDoneFrontend: true,
    })
  })
  }

  handleUndo(tipId){
    console.log("hey im called")
    let id = this.props.id
  
    api.markTipUndo(tipId, id)
    .then (tipDoc => {
      this.setState({
        isDoneFrontend: false,
      })
      this.props.onUndo(tipDoc)
    })
    }

  // editTip(tip) {
  //   this.setState({
  //     tips: [...this.state.tips, tip]
  //   })
  // }

  render() {
    return (
      <div >
      {this.props.isDone &&
      <div >
        <p className="doneBox"><strong>Title:</strong> {this.props.title}</p>
        <Button className="btn-trip-detail-done" onClick={() => this.handleUndo(this.props.tipId)}>Do again!</Button>
      </div>
      }
      {!this.props.isDone && 
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
                  <Button className="btn btn-trip-detail-done" onClick={() => this.handleIsDone(this.props.tipId)}>Done!</Button>
                  <Button className="btn btn-trip-detail-delete" onClick={() => this.handleDelete(this.props.tipId)}>Delete</Button>
                </div>

          </div>
      }
      </div>
    );
  }
}

export default TripDetailTip;

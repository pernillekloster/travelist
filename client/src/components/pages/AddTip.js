import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import api from '../../api'

class AddTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      category: this.props.category,
      title: "",
      location: "",
      description: "",
    };
    this.toggle = this.toggle.bind(this);
    this.addTip = this.addTip.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleInputChange(stateFieldName, event){
    let newState = {}
    newState[stateFieldName] = event.target.value
    this.setState(newState)
  }

  addTip(e) {
    let id = this.props.id
    let data = {
      category: this.state.category,
      title: this.state.title,
      location: this.state.location,
      description: this.state.description,
    }
    console.log("debug api route", data)
    api.postTip(id, data)
      .then(data => {
        this.toggle()
        this.setState({
          category: "",
          title: '',
          location: '',
          description: '',
        })
        this.props.onAdd(data.tip)
      })
      .catch(err => console.log(err)
      )
  }

  render() {
    return (
      <div>
        <Button className="btn btn-trip-detail-addTip" color="#FAAD8D" onClick={this.toggle}>Add new tip</Button>
        <Modal className="Modal" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className="important-header modalHeader" toggle={this.toggle}>Add tip to your {this.props.destination} trip</ModalHeader>
          <form>
          <ModalBody className="detail-size modalBody">
          <div className="inputCategoryTrip">
            Category: <span>{this.props.category}</span>
            <input type="hidden" value={this.state.category} />
             <br/>
          </div>
            <input className="inputAddTip" type="text" placeholder="Title" style={{border: 'solid'}} value={this.state.title} onChange={(e) => this.handleInputChange("title", e)} /> <br/>
            <input className="inputAddTip" type="text" placeholder="Location" style={{border: 'solid'}} value={this.state.location} onChange={(e) => this.handleInputChange("location", e)} /> <br/>
            <input className="inputAddTip" type="text" placeholder="Description" style={{border: 'solid'}} value={this.state.description} onChange={(e) => this.handleInputChange("description", e)} /> <br/>
          </ModalBody>
          <ModalFooter className="modalFooter">
            <Button className="btn btn-trip-detail-saveTip" color="#1F5B66" onClick={this.addTip}>Save tip</Button>{' '}
            <Button className="btn btn-trip-detail-cancelTip" color="white" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </form>
        </Modal> 

        </div>
    );
  }
}

export default AddTip;
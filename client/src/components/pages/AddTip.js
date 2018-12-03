import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import api from '../../api'

class AddTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _creator: "",
      _trip: "",
      // modal: false,
      title: "",
      location: "",
      description: ""
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleInputChange(stateFieldName, event){
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e){
    e.preventDefault()
    
    let id = this.props.match.params.id

    let data = {
      title: this.state.title,
      location: this.state.location,
      description: this.state.description,
    }
    api.postTip(id, data)
    .then(result => {
      console.log('success');
      this.props.history.push("../pages/TripDetail.js")
      })
      .catch(err => console.log(err)
      )
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Add new for and drink tip</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add tip</ModalHeader>
          <form>
          <ModalBody>
            Title: <input type="text" value={this.state.title} onChange={(e) => this.handleInputChange("title", e)} /> <br/>
            Location: <input type="text" value={this.state.location} onChange={(e) => this.handleInputChange("location", e)} /> <br/>
            Description: <input type="text" value={this.state.description} onChange={(e) => this.handleInputChange("description", e)} /> <br/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => this.handleClick(e)}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </form>
        </Modal> 
        </div>
    );
  }
}

export default AddTip;
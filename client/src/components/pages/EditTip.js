import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import api from '../../api'

class EditTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      category: this.props.category,
      title: this.props.title,
      location: this.props.location,
      description: this.props.description,
    };
    this.toggle = this.toggle.bind(this);
    this.editTip = this.editTip.bind(this);
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

  editTip(e) {
    let id = this.props.id
    let tipId = this.props.tipId

    let data = {
      category: this.state.category,
      title: this.state.title,
      location: this.state.location,
      description: this.state.description,
    }

    api.editTip(id, tipId, data)
      .then(data => {
        this.toggle()
        this.setState({
          category: "",
          title: '',
          location: '',
          description: '',
        })
        this.props.onEdit(data.tip)
      })
      .catch(err => console.log(err)
      )

      this.props.history.push("/trip-detail/:id");
  }

  render() {
    return (
      <div>
        <Button className="btn btn-trip-detail-edit" onClick={this.toggle}>Edit</Button>
        <Modal className="Modal" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className="important-header modalHeader" toggle={this.toggle}>Edit your tip:</ModalHeader>
          <form>
          <ModalBody className="detail-size modalBody">
          <div className="inputCategoryTrip">
            Category: <span>{this.props.category}</span>
            <input type="hidden" value={this.state.category} />
             <br/>
          </div>
            <input className="inputAddTip" type="text" placeholder={this.state.title} style={{border: 'solid'}} value={this.state.title} onChange={(e) => this.handleInputChange("title", e)} /> <br/>
            <input className="inputAddTip" type="text" placeholder={this.state.location} style={{border: 'solid'}} value={this.state.location} onChange={(e) => this.handleInputChange("location", e)} /> <br/>
            <input className="inputAddTip" type="text" placeholder={this.state.description} style={{border: 'solid'}} value={this.state.description} onChange={(e) => this.handleInputChange("description", e)} /> <br/>
          </ModalBody>
          <ModalFooter className="modalFooter">
            <Button className="btn btn-trip-detail-saveTip" color="#1F5B66" onClick={this.editTip}>Edit tip</Button>{' '}
            <Button className="btn btn-trip-detail-cancelTip" color="white" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </form>
        </Modal> 

        </div>
    );
  }
}

export default EditTip;
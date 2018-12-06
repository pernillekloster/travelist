import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';


class Start extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
    }
    this.toggle = this.toggle.bind(this);

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="Start">

        <div>
          <div>
            <Button onClick={this.toggle}>

              Signup
        </Button>
          </div>
        </div>

        {/* <Button className="btn btn-add-trip" onClick={this.toggle}>Add new tip</Button> */}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader className="important-header modalHeader" toggle={this.toggle}>Add your new destination</ModalHeader>
          <form>
            <ModalBody className="detail-size modalBody">
              <div className="">
                TEst Some onboarding stuff here
            </div>
              <Button className="btn btn-trip-detail-saveTip" color="#1F5B66" onClick={this.addTrip}>
                <Link className="btn-trip-detail-search" to="/home">
                  Get started
              </Link>
              </Button>{' '}
            </ModalBody>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Start;

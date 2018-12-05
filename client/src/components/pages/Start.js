import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'


class Start extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="Start">
        <div className="onboarding important-header">
        Some inspirational travel quote here?
        </div>

          <Button className="btn btn-trip-detail-search" color="#1F5B66">
          <Link className="btn-trip-detail-search" to="/signup">Signup</Link>
          </Button>

          <Button className="btn btn-trip-detail-search" color="#1F5B66">
          <Link className="btn-trip-detail-search" to="/login">Login</Link>
          </Button>
      
      </div>
    );
  }
}

export default Start;

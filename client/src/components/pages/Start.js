import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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

          <button className="btn btn-trip-detail-search" color="#1F5B66">
          <Link className="btn-trip-detail-search" to="/signup">Signup</Link>
          </button>

          <button className="btn btn-trip-detail-search" color="#1F5B66">
          <Link className="btn-trip-detail-search" to="/login">Login</Link>
          </button>
      
      </div>
    );
  }
}

export default Start;

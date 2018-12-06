import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'


class Start extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleSignup(e){
    this.props.history.push("/signup") // Redirect to the home page
  }

  handleLogin(e){
    this.props.history.push("/login") // Redirect to the home page
  }

  render() {
    return (
      <div className="Start">
        <div className="onboarding important-header">
            <p className="roboto"> All your travel tips <br/> in one place. </p>
        </div>

          <button className="btn btn-trip-detail-search" color="#1F5B66" onClick={(e) => this.handleSignup(e)}>
          <Link className="btn-trip-detail-search" to="/signup">Signup</Link>
          </button>

          <button className="btn btn-trip-detail-search" color="#1F5B66" onClick={(e) => this.handleLogin(e)}>
          <Link className="btn-trip-detail-search" to="/login">Login</Link>
          </button>
      </div>
    );
  }
}

export default Start;

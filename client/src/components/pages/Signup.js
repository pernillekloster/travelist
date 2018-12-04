import React, { Component } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';


class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      password: "",
      message: null
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/home") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
      console.log("Fail signup")
  }

  render() {
    return (
      <div className="Signup">
        <form>
          <input className="inputLogin" placeholder="username" type="text" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} /> <br />
          <input className="inputLogin" placeholder="e-mail" type="text" value={this.state.email} onChange={(e) => this.handleInputChange("email", e)} /> <br />
          <input className="inputLogin" placeholder="password" type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} /> <br />
          <button className="btn btn-trip-detail-search" color="#1F5B66" onClick={(e) => this.handleClick(e)}>Signup</button>
        </form>
        <p>Do you already have an account?
          <Link className="login-signup-link" to="/login"> Login</Link>
        </p>
        {this.state.message && 
        <div className="btn errormessage">
          {this.state.message}
        </div>}
      </div>
    );
  }
}

export default Signup;

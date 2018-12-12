import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
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
    console.log("debug login");

    api.login(this.state.username, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/home") // Redirect to the home page
      })
      .catch(err =>
        this.setState({ message: err.toString() }))
    console.log("FAIL")
  }

  render() {
    return (
      <div className="Login">
      <div>
      <form>
        <input className="inputLogin" placeholder="username" type="text" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} /> <br />
        <input className="inputLogin" placeholder="password" type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} /> <br />
        <button className="btn btn-trip-detail-search" color="#1F5B66" onClick={(e) => this.handleClick(e)}>Login</button>
      </form>
      </div>
      <div>
      <p>Don't have an account yet? 
        <Link className="login-signup-link" to="/signup"> Signup</Link>
      </p>
      {this.state.message && <div className="btn errormessage">
        {this.state.message}
      </div>}
    </div>
    </div>
    );
  }
}

export default Login;
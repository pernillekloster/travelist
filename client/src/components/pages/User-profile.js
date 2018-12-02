import React, { Component } from "react";
import api2 from "../../api2";

class userProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      followers: [],
      following: []
    }
  }
  render() {
    return (
      <div className="App">
        <h1>
          Search 
        </h1>
    <button>Username</button>
 
      </div>
    );
  }
  componentDidMount() {
    api2.getAllUsers()
      .then(users => {
        console.log("debug users", users)
        this.setState({
          users: users
        })
      })
      .catch(err => console.log("error userprofile", err))
  }
}



export default userProfile;

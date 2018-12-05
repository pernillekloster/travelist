import React, { Component } from "react";
import api from "../../api";
import { Container, Input } from "reactstrap";
import { Route, NavLink, Link } from "react-router-dom";
import AllUsers from "./AllUsers";
import Following from "./Following";
import Followers from "./Followers";
//import "../../styles/Eullin.css"
import "../../styles/index.css";

class userProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      users: [],
      followers: [],
      following: []
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  isFollowing(user) {
    let idLoggedInUser = api.getLoggedInUserSync()._id;
    return user.followers.includes(idLoggedInUser);
  }

  render() {
    return (
      <Container className="userProfile">
        <h1>Your profile</h1>

        <div id="NavBar-Profile">
          <Link className="aColor" tag={NavLink} exact to="/user-profile">
            All users
          </Link>{" "}
          <Link
            className="aColor"
            tag={NavLink}
            outline
            exact
            to="/user-profile/following"
          >
            Following
          </Link>
          {"   "} {"   "}
          <Link
            className="aColor"
            tag={NavLink}
            outline
            exact
            to="/user-profile/followers"
          >
            Followers
          </Link>
        </div>

        <Input
          type="text"
          name="search"
          className="mb-3 inputLogin"
          value={this.state.search}
          onChange={this.handleChange}
          placeholder="Search username"
        />

        <Route
          path="/user-profile"
          exact
          render={props => <AllUsers {...props} search={this.state.search} />}
        />
        <Route
          path="/user-profile/following"
          exact
          render={props => <Following {...props} search={this.state.search} />}
        />
        <Route
          path="/user-profile/followers"
          exact
          render={props => <Followers {...props} search={this.state.search} />}
        />

      <br/>
      <Link className="logout" to="/login" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>
      <hr className="hr-trip-detail" />
      <br />

      </Container>

    );
  }
}

export default userProfile;

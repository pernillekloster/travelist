import React, { Component } from "react";
import api from "../../api";
import { Container, Input, Button } from "reactstrap";
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

  handleLogoutClick(e) {
    api.logout()
    this.props.history.push('/login');
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
    <div>
      <Container className="userProfile">
        <h4 className="homeHeader">Find inspiration from other <br/>TraveListers!</h4>

          <Input
          className="mb-3 inputSearch"
          type="text"
          name="search"
          value={this.state.search}
          onChange={this.handleChange}
          placeholder="Search username"
        />

        <div id="NavBar-Profile">
          <Link className="aColor" tag={NavLink} exact to="/user-profile">
            All users
          </Link>{" "}
          <Link
            className="aColor middleLink"
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


      </Container>

      <div class="stickyFooter">
      <Button className="stickyFooter" color="white" onClick={(e) => this.handleLogoutClick(e)}>Logout</Button>
      </div>

  </div>
    );
  }
}

export default userProfile;

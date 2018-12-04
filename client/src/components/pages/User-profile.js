import React, { Component } from "react";
import api from "../../api";
import { Table, Button, Container, Input, Collapse, CardBody, Card, Col, Row } from "reactstrap";
import { Route, NavLink } from "react-router-dom";
import AllUsers from "./AllUsers";
//import Following from "./Following";

class userProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      users: [],
      followers: [],
      following: [],
      collapse: false,
      isAdded: true,
      followerShown: false
    };
  }

/*   togglefollowing = following => {
    this.setState({
      following: following,
      collapse: !this.state.collapse
    });
  };

  toggleFollowers = followers => {
    this.setState({
      followers: followers,
      followerShown: !this.state.collapse
    });
  }; */

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
        <div>
          <Button
            tag={NavLink}
            outline
            color="primary"
            exact
            to="/user-profile"
          >
            All users
          </Button>
          
          <Button
            tag={NavLink}
            outline
            color="primary"
            exact
            to="/user-profile/following"
          >
            Following
          </Button>
          
          <Button
            tag={NavLink}
            outline
            color="primary"
            exact
            to="/user-profile/followers"
          >
            Followers
          </Button>
        </div>

        <Input
          type="text"
          name="search"
          className="mb-3"
          value={this.state.search}
          onChange={this.handleChange}
          placeholder="Username"
        />
        
        <Route
          path="/user-profile"
          exact
          render={props => <AllUsers {...props} search={this.state.search} />}
        />
        <Route
          path="/user-profile/following"
          exact
          render={() => <div>WIP</div>}
        />
        <Route
          path="/user-profile/followers"
          exact
          render={() => <div>WIP</div>}
        />
      </Container>
    );
  }

  handleFollowClick = userId => {
    api.postFollowStatus(userId).then(newUser => {
      this.setState({
        users: this.state.users.map(user =>
          userId === user._id ? newUser : user
        )
      });
    });
  };

  followersHandler = () => {
    api
      .getFollowers()
      .then(followersData => {
        this.setState({
          followers: followersData
        });
      })
      .catch(err => console.log("error userprofile", err));
  };

  followingHandler = () => {
    api
      .getFollowing()
      .then(followingData => {
        this.setState({
          following: followingData
        });
      })
      .catch(err => console.log("error userprofile", err));
  };

  componentDidMount() {
    api.getAllUsers().then(users => {
      this.setState({
        users: users
      });
    });
  }
}

export default userProfile;

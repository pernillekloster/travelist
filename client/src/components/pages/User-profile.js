import React, { Component } from "react";
import api from "../../api";
import {
  Table,
  Button,
  Container,
  Input,
  Collapse,
  CardBody,
  Card,
  Link
} from "reactstrap";
import "../../styles/Eullin.css";

class userProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      users: [],
      followers: [],
      following: [],
      isAdded: false,
      collapse: false
    };
  }

  togglefollowing = following => {
    this.setState({
      following: following,
      collapse: !this.state.collapse
    });
  };

  /*   toggleFollowers = (followers) => {
    this.setState({ 
      followers: followers,
      collapse: !this.state.collapse 
    });
  } */

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
        <h1>Username</h1>
        <Input
          type="text"
          name="search"
          className="mb-3"
          value={this.state.search}
          onChange={this.handleChange}
        />

        <Table>
          <thead>{/*             <tr>
</tr> */}</thead>
          <tbody>
            {this.state.users
              .filter(users =>
                users.username
                  .toLowerCase()
                  .includes(this.state.search.toLocaleLowerCase())
              )
              .map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>
                    <Button
                      className="profile-follow"
                      color="primary"
                      outline={this.isFollowing(user)}
                      style={{ width: 120 }}
                      onClick={() => this.handleFollowClick(user._id)}
                    >
                      {this.isFollowing(user) ? "Unfollow" : "Follow"}
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <hr/>

        <div id="btn-follow-ers-ing">
          <Button
            color="white"
            onClick={this.togglefollowing}
            style={{ marginBottom: "1rem" }}
          >
            Following
          </Button>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                {this.state.users
                  .filter(user =>
                    user.followers.includes(api.getLoggedInUserSync()._id)
                  )
                  .map(user => (
                    <div>{user.username}</div>
                  ))}
              </CardBody>
            </Card>
          </Collapse>

          <Button
            color="primary"
            onClick={this.toggleFollowers}
            style={{ marginBottom: "1rem" }}
          >
            Followers
          </Button>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                {this.state.users
                  .filter(user =>
                    user.following.includes(api.getLoggedInUserSync()._id)
                  )
                  .map(user => (
                    <div>{user.username}</div>
                  ))}
              </CardBody>
            </Card>
          </Collapse>
        </div>
        {/*         <br />
        <br />
         <hr />
        <h2>Following</h2>
        {this.state.users
          .filter(user =>
            user.followers.includes(api.getLoggedInUserSync()._id)
          )
          .map(user => (
            <div>{user.username}</div>
          ))}

        <hr />
        <h2>Followers</h2>
        {this.state.users
          .filter(user =>
            user.following.includes(api.getLoggedInUserSync()._id)
          )
          .map(user => (
            <div>{user.username}</div>
          ))}

        <hr />  */}
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
        console.log("debug following frontend", followingData);
        this.setState({
          following: followingData
        });
        console.log("debug following", this.state.following);
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

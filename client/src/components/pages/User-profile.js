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
  Col,
  Row
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
      collapse: false,
      isAdded: true,

    };
  }

  
  togglefollowing = following => {
    this.setState({
      following: following,
      collapse: !this.state.collapse,
    });
  };


  toggleFollowers = followers => {
    this.setState({
      followers: followers,
      collapse: !this.state.collapse,
    });
  };

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

        <hr />

        <Container>
          <Row>
            <Col xs="6">
              <Button
                color="primary"
                onClick={this.togglefollowing}
                style={{ marginBottom: "1rem" }}
              >
                Following
              </Button>
            </Col>

            <Col xs="6">
              <Button
                color="white"
                onClick={this.toggleFollowers}
                style={{ marginBottom: "1rem" }}
              >
                Followers
              </Button>
            </Col>
          </Row>
        </Container>

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

{/*   <div>
    {this.state.followerShown && 
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
  }
  </div> */}
  

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

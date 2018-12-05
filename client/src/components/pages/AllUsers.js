import React, { Component } from "react";
import api from "../../api";
import { Table, Button, Container } from "reactstrap";
import "../../styles/index.css";
import "../../styles/Eullin.css"

export default class AllUsers extends Component {
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

  isFollowing(user) {
    let idLoggedInUser = api.getLoggedInUserSync()._id;
    return user.followers.includes(idLoggedInUser);
  }

  render() {
    return (
      <Container className="userProfile">
        <Table>
          <tbody>
            {this.state.users
              .filter(users => {
                if (users._id !== api.getLoggedInUserSync()._id) return true;
              })
              .filter(users =>
                users.username
                  .toLowerCase()
                  .includes(this.props.search.toLocaleLowerCase())
              )
              .map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>
                    <button
                      className="btn user"
                      outline={this.isFollowing(user)}
                      style={{ width: 120 }}
                      onClick={() => this.handleFollowClick(user._id)}
                    >
                      {this.isFollowing(user) ? "Unfollow" : "Follow"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <hr />
      </Container>
    );
  }
  bgcolorHandler = e => {
    e.target.style.backgroundColor = "red";
  };

  handleFollowClick = userId => {
    api.postFollowStatus(userId).then(newUser => {
      this.setState({
        users: this.state.users.map(user =>
          userId === user._id ? newUser : user
        )
      });
    });
  };

  componentDidMount() {
    api.getAllUsers().then(users => {
      this.setState({
        users: users
      });
    });
  }
}

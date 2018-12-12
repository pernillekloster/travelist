import React, { Component } from "react";
import api from "../../api";
import { Table, Container } from "reactstrap";

export default class Following extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      users: [],
      followers: [],
      following: []
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
              .filter(user =>
                user.followers.includes(api.getLoggedInUserSync()._id)
              )
              .filter(user =>
                user.username
                  .toLowerCase()
                  .includes(this.props.search.toLocaleLowerCase())
              )
              .map(user => (
                <tr>
                  <td className="usernamesRow usernames">{user.username}</td>
                  <td className="usernamesRow">
                    <button
                      className="btn user buttons"
                      onClick={() => this.handleFollowClick(user._id)}
                      style={{ marginBottom: "1rem" }}
                    >
                      {this.isFollowing(user) ? "Unfollow" : "Follow"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
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

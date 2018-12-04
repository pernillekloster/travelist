import React, { Component } from "react";
import api from "../../api";

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
      <div className="userProfile">
        <h1>Username</h1>
        <input
          type="text"
          name="search"
          value={this.state.search}
          onChange={this.handleChange}
        />
        <ul>
          {this.state.users
            .filter(users =>
              users.username
                .toLowerCase()
                .includes(this.state.search.toLocaleLowerCase())
            )
            .map(user => (
              <li>
                {user.username}
                <button
                  className="profile-follow"
                  onClick={() => this.handleFollowClick(user._id)}
                >
                  {this.isFollowing(user) ? "Unfollow" : "Follow"}
                </button>
              </li>
            ))}
        </ul>
        <br />
        <br />
        <button onClick={this.followersHandler}>followers</button>
        <ul>
          {this.state.followers.map(e => (
            <li>{e.username}
                  <button
                  className="profile-follow"
                  onClick={() => this.handleFollowClick(e._id)}
                >
                  {this.isFollowing(e) ? "Unfollow" : "Follow"}
                </button>
            </li>
          ))}
        </ul>
        <button onClick={this.followingHandler}>following</button>
        <ul>
          {this.state.following.map(e => (
            <li>
              {e.username}
              <button
                className="profile-follow"
                onClick={() => this.handleFollowClick(e._id)}
              >
                {this.isFollowing(e) ? "Unfollow" : "Follow"}
              </button>
            </li>
          ))}
        </ul>
      </div>
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

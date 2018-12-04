import React, { Component } from 'react'
import api from "../../api";
import {
  Button,
  Container,
  Input,
  Collapse,
  CardBody,
  Card,
  Col,
  Row
} from "reactstrap";


export default class Following extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      users: [],
      followers: [],
      following: [],
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
    return  (
      <div>
      aloha
        {this.state.users
          .filter(user =>
            user.followers.includes(api.getLoggedInUserSync()._id)
          )
          .map(user => (
            <div>{user.username}</div>
          ))}
    </div>
      )
    }
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
  }

 
      


{/* <Collapse isOpen={this.state.collapse}>
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
</Collapse> */}
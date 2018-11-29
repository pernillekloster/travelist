const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const User = require("../models/User");
const Trip = require("../models/Trip");
const Tip = require("../models/Tip");

router.get("/", isLoggedIn, (req, res, next) => {
  User.find({}).then(data => {
    res.send(data);
  });
});

router.get("/following", isLoggedIn, (req, res, next) => {
  let id = req.user._id
  User.findById(id).then(data => {
    res.json(data.following);
  });
});

router.get("/followers", isLoggedIn, (req, res, next) => {
  let id = req.user._id
  User.findById(id).then(data => {
    res.json(data.followers);
  });
});

router.post("/:username/follow", isLoggedIn, (req, res, next) => {
  let username = req.params.username;

  User.findOne({ username }).then(user => {
    // if it does NOT find user = -1
    if (req.user.following.indexOf(user.username) === -1) {
      console.log("FOLLOWING");
      User.findByIdAndUpdate(
        { _id: req.user._id },
        { $push: { following: user.username } },
        { new: true }
      )
        .then(user => {
          User.findOneAndUpdate(
            { username: username },
            { $push: { followers: req.user.username } },
            { new: true }
          ).then(followedUser => {
            res.json(followedUser);
          });
        })
        /*           .then(user => {
            const userToken = createUserToken(user);
            res.send({ token: userToken });
          }) */
        .catch(console.error);
    } else {
      console.log("UNFOLLOWED");
      User.findByIdAndUpdate(
        { _id: req.user._id },
        { $pull: { following: user.username } },
        { new: true }
      )
        .then(user => {
          User.findOneAndUpdate(
            { username: username },
            { $pull: { followers: req.user.username } },
            { new: true }
          ).then(user => {
            res.send(user);
          });
        })
        /*        .then(user => {
            const userToken = createUserToken(user);
            res.send({ token: userToken });
          }) */
        .catch(console.error);
    }
  });
});

module.exports = router;

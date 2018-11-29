const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const User = require("../models/User");
const Trip = require("../models/Trip");
const Tip = require("../models/Tip");

router.get("/", isLoggedIn, (req, res, next) => {
  let id = req.user._id
  User.findById(id)
    .then(data => {
    res.json(data);
  });
});

router.get("/all", isLoggedIn, (req, res, next) => {
  User.find()
    .then(data => {
    res.json(data);
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

// POST Route to follow users - id in url is NOT of the logged in user but 
// the id of the person the user wants to follow!
router.post("/:id/follow", isLoggedIn, (req, res, next) => {
  let id = req.params.id;
console.log(id)

  User.findById(id).then(user => {
    // if it does NOT find user = -1
    if (req.user.following.indexOf(user._id) === -1) {
      console.log("FOLLOWING");
      User.findByIdAndUpdate(
        { _id: req.user._id },
        { $push: { following: user._id } },
        { new: true }
      )
        .then(user => {
          User.findOneAndUpdate(
            { _id: id },
            { $push: { followers: req.user._id } },
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
        { $pull: { following: user._id } },
        { new: true }
      )
        .then(user => {
          User.findOneAndUpdate(
            { _id: id },
            { $pull: { followers: req.user._id } },
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

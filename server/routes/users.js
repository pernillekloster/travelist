const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const User = require("../models/User");
const Trip = require("../models/Trip");
const Tip = require("../models/Tip");

router.get("/", isLoggedIn, (req, res, next) => {
  let id = req.user.id
  User.findById(id)
    .then(data => {
    res.json(data);
  });
});

router.get("/all", isLoggedIn, (req, res, next) => {
  User.find()
    .then(data => {
      console.log("debug users backend", data)
    res.json(data);
  });
});

router.get("/following", isLoggedIn, (req, res, next) => {
  let id = req.user._id
  User.findById(id)
    .populate("following")
    .then(data => {
      console.log("debug data following backend", data)
    res.json(data.following);
  });
});

router.get("/followers", isLoggedIn, (req, res, next) => {
  let id = req.user._id
  User.findById(id)
  .populate("followers")
  .then(data => {
    res.json(data.followers);
  });
});

// POST Route to follow users - id in url is NOT of the logged in user but 
// the id of the person the user wants to follow!
router.post("/:id/follow", isLoggedIn, (req, res, next) => {
  let id = req.params.id;
  User.findById(id).then(user => {
    // if the user is not in my following array "-1", add it. 
    if (req.user.following.indexOf(user._id) === -1) {
      User.findByIdAndUpdate(
        { _id: req.user._id }, //this is the logged in user
        { $push: { following: user._id } },
        { new: true }
      )
        .then(user => {
          User.findOneAndUpdate(
            { _id: id }, // the user that got followed 
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
            { new: true })
            .then(user => {
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

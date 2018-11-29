const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const User = require("../models/User")
const Trip = require("../models/Trip")
const Tip = require("../models/Tip")

// GET all trips from friends who have been to the same destination/place
router.get('/id/friendtrips', isLoggedIn, (req, res, next) => {
  // Get id of users trip
  let id = this.props.match.params.id

  // Find Users trip to get info about destination and friends of user
  Trip.findById(id)
  .populate("_creator")
  .then(tripData => {

    let tripDestination = tripData.destination
    // let friends = tripData._creator._friends - returns array / in trip match with _creator

      Trip.find({destination: tripDestination})
      .then(tripsData => {
        res.json({
          tripsData
        })
      })
  })
});

// GET detail of the selected trip from a friend
router.get("/friendtrips/:id", isLoggedIn, (req, res, next) => {
  // Get id of friends trip
  let id = this.props.match.params.id

  // Find selected friends trip and display details
  Trip.findById(id)
  .then(tripData => 
    res.json({
      tripData
    })
  )
})

// // POST tip from friends' trip 
// router.post("/friendtrips/addtip", isLoggedIn, (req, res, next) => {

// })

module.exports = router;

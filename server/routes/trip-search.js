const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const User = require("../models/User")
const Trip = require("../models/Trip")
const Tip = require("../models/Tip")

// GET info on single trip
router.get("/single/:id", isLoggedIn, (req, res, next) => {
  let id = req.params.id
  Trip.findById(id)
  .then( tripData => 
    res.json(tripData)
    )
})

// GET all trips from friends who have been to the same destination/place
router.get('/:id', isLoggedIn, (req, res, next) => {
  // Get id of users current trip
  let id = req.params.id

  // Find Users trip to get info about destination and the people the user follow (via populate)
  Trip.findById(id)
  .populate("_creator")
  .then(tripData => {
    let tripDestination = tripData.destination
    console.log("debug destination", tripDestination)
    let following = tripData._creator.following
    console.log("debug following", following)

      Trip.find({destination: tripDestination, _creator: {$in: following}, _id: {$ne: id}})
      .populate("_creator")
      // Trip.find({destination: tripDestination, _id: {$ne: id}})
      .then(tripsData => {
        res.json(
          tripsData
        )
      })
  })
});

// GET detail of the selected trip from a friend
router.get("/:id/:friendsId", isLoggedIn, (req, res, next) => {
  // Get id of friends trip
  let friendsId = req.params.friendsId
  // Store id of the users trip to use it in next route
  let id = req.params.id

  // Find selected friends trip and display details
  Trip.findById(friendsId)
  .populate("_tip")
  .then(tripData => 

    res.json({
      tripData
    })
  )
})

// POST tip from friends' trip 
router.post("/:id/:friendsId/:newTipId", isLoggedIn, (req, res, next) => {
  // Get id of users trip
  let id = req.params.id
  let friendsId = req.params.friendsId
  let newTipId = req.params.newTipId

  // Create copy of tip based on newTipId and pass on that TipId to be added to array

  Tip.findById(newTipId)
  .then(tipData => {
    console.log("debug tipData", tipData)
    const {category, description, title, location} = tipData
    const _creator = req.user._id
    const _trip = id

    // Create duplicate of added tip
    let p1 = Tip.create({_creator, _trip, category, description, title, location})
    // Find users trip to add duplicate tip
    let p2 = Trip.findById(id)

    Promise.all([p1, p2])
    .then(values => {
      let newTipData = values[0]
      let tripData = values[1]

      // Create new tip array with existing tips and new one
      let duplicateNewTip = newTipData._id
      let tipArray = tripData._tip
      let newTipArray = [...tipArray, duplicateNewTip]
      console.log("debug duplicate tip", duplicateNewTip)
      console.log("debug add tip new array", newTipArray)

       // Find Trip and update tips with new tip
       Trip.findByIdAndUpdate(id, {
        _tip: newTipArray,
        })
        .then(updateTrip => {
        console.log("debug update trip", updateTrip)
        res.json({
          success: true,
          updateTrip
        })
      })
    })
  })

})

module.exports = router;

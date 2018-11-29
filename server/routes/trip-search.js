const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const User = require("../models/User")
const Trip = require("../models/Trip")
const Tip = require("../models/Tip")

// GET all trips from friends who have been to the same destination/place
router.get('/:id/friendtrips', isLoggedIn, (req, res, next) => {
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
      // Trip.find({destination: tripDestination, _id: {$ne: id}})
      .then(tripsData => {
        res.json({
          success: true,
          tripsData
        })
      })
  })
});

// GET detail of the selected trip from a friend
router.get("/friendtrips/:id", isLoggedIn, (req, res, next) => {
  // Get id of friends trip
  let id = req.params.id

  // Find selected friends trip and display details
  Trip.findById(id)
  .then(tripData => 

    res.json({
      tripData
    })
  )
})

// POST tip from friends' trip 
// router.post("/friendtrips/addtip", isLoggedIn, (req, res, next) => {
//   let tripId = id
//   let newTipId = req.body.tripId

//   // Find Trip of user first to have access to current tip array
//   Trip.findById(tripId)
//   .then(tripData => {
//     let tipArray = tripData._tips
//     let newTipArray = [...tipArray, tripId]

//     // Find Trip and update tips with new tip
//       Trip.findByIdAndUpdate(tripId, {
//         _tip: newTipArray,
//       })
//   })

// })

module.exports = router;

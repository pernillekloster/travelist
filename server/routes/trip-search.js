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

    let following = tripData._creator.following

      Trip.find({destination: tripDestination, _creator: {$in: following}, _id: {$ne: id}})
      .populate("_creator")
      .then(tripsData => {
        res.json(
          tripsData
        )
      })
  })
});

// GET detail of the selected trip from a friend
// router.get("/:id/:friendsId", isLoggedIn, (req, res, next) => {
//   // Get id of friends trip
//   let friendsId = req.params.friendsId
//   // Store id of the users trip to use it in next route
//   let id = req.params.id

//   // Find selected friends trip and display details
//   Trip.findById(friendsId)
//   .populate("_tip")
//   .then(tripData => 

//     res.json({
//       tripData
//     })
//   )
// })

// POST tip from friends' trip 
router.post("/:id/:friendsId/:newTipId", isLoggedIn, (req, res, next) => {
  // Get id of users trip
  let id = req.params.id
  let friendsId = req.params.friendsId
  let newTipId = req.params.newTipId

  // Create copy of tip based on newTipId and pass on that TipId to be added to array

  Tip.findById(newTipId)
  .then(tipData => {

    const {category, description, title, location} = tipData
    const _creator = req.user._id
    const _trip = id

    // Create duplicate of added tip
    Tip.create({_creator, _trip, category, description, title, location})
    .then(tipDoc => {
      res.json({
        tipDoc
      })
    })
  })

})

module.exports = router;

const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const User = require("../models/User")
const Trip = require("../models/Trip")
const Tip = require("../models/Tip")


router.use((req, res, next) => {
  next()
})

// GET Route to get all trips
router.get('/get-trip', isLoggedIn, (req, res, next) => {
  let _trip = req.params.id
  Trip.find()
    .then(trip => {
      res.json(trip);
    })
    .catch(err => next(err))
});

// GET Route to get user trip
router.get('/get-user-trip', isLoggedIn, (req, res, next) => {
  let id = req.user._id
  Trip.find({_creator: id})
    .then(trip => {
      res.json(trip);
    })
    .catch(err => next(err))
});

// POST Route to create a Trip
router.post('/create-trip', isLoggedIn, (req, res, next) => {
  let destination = req.body.destination.substring(0,1).toUpperCase() + req.body.destination.substring(1).toLowerCase()
  let _creator = req.user._id
  Trip.create({ _creator, destination})
    .then(trip => {
      res.json(
        trip);
    })
    .catch(err => next(err))
});

//GET Route tips from a trip
router.get('/get-tip/:id', isLoggedIn, (req, res, next) => {
  let _trip = req.params.id
  Tip.find({_trip: _trip})
    .then(tips => {
      res.json(tips);
    })
    .catch(err => next(err))
});

//POST Route create tip
  router.post('/create-tip/:id', isLoggedIn, (req, res, next) => {
    let _trip = req.params.id
    let { category, description, title, location } = req.body
    let _creator = req.user._id

    Tip.create({ _creator, _trip, category, description, title, location })
      .then(tipDoc => {
            res.json({
              success: true,
              tip: tipDoc,
            })
          })
      .catch(err => next(err))
  })

// Route to update a tip
router.put('/create-tip/edit/:id/:tipId', isLoggedIn, (req, res, next) => {
  let _trip = req.params.id
  let {description, title, location } = req.body

  let _creator = req.user._id
  let _tipId = req.params.tipId
  
  Tip.findByIdAndUpdate(_tipId, {description, title, location })
    .then(tipDoc => {
      res.json({
        tipDoc
      })
    })
    .catch(err => next(err))
})

// DELETE Trip from user
router.delete('/trip-delete/:id', (req, res, next)=>{
  let tripId = req.params.id

  Trip.findByIdAndRemove(tripId)
    .then(() => {
      res.json({message: `Trip with ${tripId} is removed successfully.`});
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE Tip
router.delete('/tip-delete/:tipId', (req, res, next)=>{
  let tipId = req.params.tipId
  Tip.findByIdAndRemove(tipId)
    .then(tipDoc => {
      res.json(tipDoc);
    })
    .catch(err => {
      res.json(err);
    })
})


module.exports = router;

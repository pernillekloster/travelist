const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const User = require("../models/User")
const Trip = require("../models/Trip")
const Tip = require("../models/Tip")


router.use((req, res, next) => {
  console.log('DEBUG routes/trips');
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
  let { destination } = req.body
  let _creator = req.user._id
  let _tip= []
  Trip.create({ _creator, _tip, destination })
    .then(trip => {
      res.json(
        trip);
    })
    .catch(err => next(err))
});

//GET the tips added to the DB
router.get('/get-tip/:id', isLoggedIn, (req, res, next) => {
  let _trip = req.params.id
  Tip.find({_trip: _trip})
    .then(tips => {
      res.json(tips);
    })
    .catch(err => next(err))
});

//POST Route to add Tip to trip
  router.post('/create-tip/:id', isLoggedIn, (req, res, next) => {
    let _trip = req.params.id
    let { category, description, title, location } = req.body
    let _creator = req.user._id

    Tip.create({ _creator, _trip, category, description, title, location })
      .then(tipDoc => {
        Trip.findByIdAndUpdate(_trip, { $push: { _tip: tipDoc._id } }, { new: true })
          .then(tripDoc => {
            res.json({
              success: true,
              tip: tipDoc,
              trip: tripDoc
            })
          })
      })
      .catch(err => next(err))

    // let p1 = Tip.create({ _creator, _trip, category, description, title, location })

    // let p2 = Trip.findById(_trip)

    // Promise.all([p1, p2])
    //   .then(values => {
    //     let tipId = values[0]._id
    //     let tipArray = values[1]._tip
    //     let newTipArray = [...tipArray, tipId]
    //     Trip.findByIdAndUpdate(_trip, { _tip: newTipArray })
    //       .then(newTripData => {
    //         res.json({
    //           success: true,
    //           newTripData
    //         })
    //       })
    //   })
    //   .catch(err => next(err))
  })

// DELETE Trip from user
router.delete('/trip-delete/:id', (req, res, next)=>{
  let id = req.params.id

  Trip.findByIdAndRemove(id)
    .then(() => {
      res.json({message: `Trip with ${id} is removed successfully.`});
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE Tip and update
router.delete('/tip-delete/:id/:tipId', (req, res, next)=>{
  let id = req.param.id
  let tipId = req.params.tipId

  // Trip.findByIdAndUpdate(id, {_tip: })

  Tip.findByIdAndRemove(tipId)
    .then(() => {
      res.json({message: `Tip with ${tipId} is removed successfully.`});
    })
    .catch(err => {
      res.json(err);
    })
})


module.exports = router;

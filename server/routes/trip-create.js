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

// Route to get all trips
router.get('/get-trip', isLoggedIn, (req, res, next) => {
  // let _trip = req.params.id
  Trip.find()
    .then(trip => {
      res.json(trip);
    })
    .catch(err => next(err))
});

// Route to add a Trip
router.post('/create-trip', isLoggedIn, (req, res, next) => {
  let { destination } = req.body
  let _creator = req.user._id
  let _tip= []
  Trip.create({ _creator, _tip, destination })
    .then(trip => {
      res.json({
        success: true,
        trip
      });
    })
    .catch(err => next(err))
});

//GET the tips added to the DB
router.get('/get-tip/:id', isLoggedIn, (req, res, next) => {
  let _trip = req.params.id
  Tip.find()
    .then(tip => {
      res.json(tip);
    })
    .catch(err => next(err))
});

//Route to add Tip to trip
router.post('/create-tip/:id', isLoggedIn, (req, res, next) => {
  let _trip = req.params.id
  let { category, description, title, location } = req.body
  let _creator = req.user._id
  Tip.create({ _creator, _trip, category, description, title, location })
    .then(tip => {
      // Tip.findOne({_id: id}, function (err, user) { ... });

      res.json({
        success: true,
        tip
      });
    })
    .catch(err => next(err))
});




module.exports = router;

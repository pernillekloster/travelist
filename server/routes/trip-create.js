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
router.get('/', isLoggedIn, (req, res, next) => {
  Trip.find()
    .then(trip => {
      res.json(trip);
    })
    .catch(err => next(err))
});

// Route to add a Trip
router.post('/', isLoggedIn, (req, res, next) => {
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

module.exports = router;

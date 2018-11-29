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
router.get('/', (req, res, next) => {
  Trip.find()
    .then(trip => {
      res.json(trip);
    })
    .catch(err => next(err))
});

// Route to add a Trip
router.post('/', (req, res, next) => {
  let { destination } = req.body
  Trip.create({ destination })
    .then(trip => {
      res.json({
        success: true,
        trip
      });
    })
    .catch(err => next(err))
});

//GET route to get all trips
// router.get('/', (req, res, next) => {
//   console.log('hello from router.get');

// //POST create a trip in home page
// router.post('/', (req, res, next) => {
//   let {destination} = req.body
//   console.log("destination : ", req.body)
//   Trip.create({destination})
//   console.log("destination2 : ", req.body)

//   .then(trip => {
//   console.log("destination3 : ", req.body)

//     res.json({
//       sucess: true,
//       trip
//     })
//   })
//   .catch(err => next(err))
// })


// router.get('/secret', isLoggedIn, (req, res, next) => {
//   res.json({
//     secret: 42,
//     user: req.user
//   });
// });

module.exports = router;

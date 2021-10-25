const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicleModel');

router.route('/').post((req, res) => {
  const vehicleMake = req.body.vehicleMake;
  const vehicleModel = req.body.vehicleModel;
  const vehicleModelYear = req.body.vehicleModelYear;
  const vehicleColor = req.body.vehicleColor;
  const newVehicle = new Vehicle({
    vehicleMake,
    vehicleModel,
    vehicleModelYear,
    vehicleColor,
  });

  newVehicle.save();
});

router.route('/').get((req, res) => {
  Vehicle.find().then((foundVehicles) => res.json(foundVehicles));
});

module.exports = router;

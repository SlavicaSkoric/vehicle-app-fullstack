const mongoose = require('mongoose');

const vehiclesSchema = {
  vehicleMake: String,
  vehicleModel: String,
  vehicleModelYear: Number,
  vehicleColor: String,
};

const Vehicle = mongoose.model('Vehicle', vehiclesSchema);

module.exports = Vehicle;

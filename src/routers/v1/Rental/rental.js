const express = require('express');
const router = express.Router();

// Import the controllers from their respective paths
const rentalController = require('../../../controllers/RentalService/RentalController');
const stationController = require('../../../controllers/RentalService/StationController');
const vehicleController = require('../../../controllers/RentalService/VehicleController');

// Rental routes
router.post('/rent', rentalController.rentVehicle);
router.post('/return', rentalController.returnVehicle);
router.get('/user/:userId', rentalController.getUserRentals);

// Station routes
router.get('/stations', stationController.getStations);
router.get('/station/:id', stationController.getStationById);

// Vehicle routes
router.get('/vehicles', vehicleController.getVehicles);
router.get('/vehicle/:id', vehicleController.getVehicleById);

module.exports = router;

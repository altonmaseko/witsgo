const express = require('express');
const router = express.Router();

const Station = require('../../../models/Rental/station.js');

// Import the controllers from their respective paths
const rentalController = require('../../../controllers/RentalService/RentalController');
const stationController = require('../../../controllers/RentalService/StationController');
const vehicleController = require('../../../controllers/RentalService/VehicleController');

// Rental routes
router.post('/rent', rentalController.rentVehicle); // this works, tested
router.post('/return', rentalController.returnVehicle); // this works, testedf
router.get('/user/:userId', rentalController.getUserRentals); // get users rental history

// Station routes
router.get('/stations', stationController.getStations);
router.get('/station/:id', stationController.getStationById);

// Vehicle routes
router.get('/vehicles', vehicleController.getVehicles);
router.get('/vehicle/:id', vehicleController.getVehicleById);
// New route to get vehicles by station ID


router.post('/createstation', async (req, res) => {

    console.log("creating stations");

    const { name, location, vehicles } = req.body;

    try {
        const station = new Station({
            name,
            location,
            vehicles
        });

        await station.save();

        res.status(200).json({ success: true, station });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});



// Station = new mongoose.Schema({
//     name: {
//         type: String,
//         // required: true
//     },
//     location: {
//         type: {
//             lat: Number,
//             lng: Number
//         },
//         // required: true
//     },
//     latitude: {
//         type: Number,
//         // required: true
//     },
//     longitude: {
//         type: Number,
//         // required
//     },
//     vehicles: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Vehicle'
//     }],
//     icon: {
//         type: String,
//         default: '/images/station.png'
//     }
// }, { collection: 'Station' }); // Explicitly specify the collection name

module.exports = router;

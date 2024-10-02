const express = require('express');
const router = express.Router();

const Rental = require('../../../models/Rental/rental.js');
const Station = require('../../../models/Rental/station.js');
const Vehicle = require('../../../models/Rental/vehicle.js');
const User = require('../../../models/User.js');


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

router.get('/rentals', async (req, res) => {
    try {
        const rentals = await Rental.find();

        let rental_logs = await Promise.all(rentals.map(async rental => {

            const vehicle = await Vehicle.findById(rental.vehicle);
            // console.log("vehicle", vehicle);
            const station = await Station.findById(rental.station);
            // console.log("station", station);
            const user = await User.findById(rental.user);
            // console.log("user", user);

            return {
                email: user.email,
                first_name: user.firstName,
                last_name: user.lastName,
                vehicle_type: vehicle.type,
                station_name: station.name,
                rentedAt: rental.rentedAt,
                returnedAt: rental.returnedAt
            };
        }));

        res.status(200).json({ success: true, rental_logs });



    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
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

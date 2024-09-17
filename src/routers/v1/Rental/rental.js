const express = require('express');
const router = express.Router();
const StationController = require('../controllers/StationController');
const VehicleController = require('../controllers/VehicleController');
const RentalController = require('../../controllers/RentalController');

// Endpoint to get all stations
router.get('/stations', async (req, res) => {
    try {
        const stations = await StationController.getDoc({});
        if (stations.success) {
            res.json(stations.data);
        } else {
            res.status(404).json({ error: 'Stations not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Endpoint to get vehicles at a station
router.get('/stations/:stationId/vehicles', async (req, res) => {
    try {
        const stationId = req.params.stationId;
        const vehicles = await VehicleController.getDoc({ current_station_id: stationId });
        if (vehicles.success) {
            res.json(vehicles.data);
        } else {
            res.status(404).json({ error: 'Vehicles not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/rent', async (req, res) => {
    const { studentId, vehicleId, fromStationId, toStationId } = req.body;

    try {
        // Get the vehicle document
        const vehicle = await VehicleController.getDoc({ _id: vehicleId });
        if (!vehicle.success || vehicle.data.status !== 'available') {
            return res.status(400).json({ error: 'Vehicle is not available' });
        }

        // Update the vehicle's current station to null (since it's being rented)
        await VehicleController.edits({
            _id: vehicleId,
            current_station_id: null,
            status: 'rented'
        });

        // Decrease the vehicle count from the originating station
        const fromStation = await StationController.getDoc({ _id: fromStationId });
        if (fromStation.success) {
            // Logic to decrease vehicle count in the station's inventory
            await StationController.edits({
                _id: fromStationId,
                $inc: { vehicle_count: -1 } // Assumes a `vehicle_count` field
            });
        }

        // Create a rental record
        await RentalController.insertRecord({
            student_id: studentId,
            vehicle_id: vehicleId,
            is_active: true
        });

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Server error during rental process' });
    }
});

module.exports = router;

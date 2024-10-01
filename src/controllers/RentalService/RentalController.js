const Rental = require('../../models/Rental/rental');
const Vehicle = require('../../models/Rental/vehicle');
const Station = require('../../models/Rental/station');
const mongoose = require("mongoose");

// Rent a vehicle
// Rent a vehicle
exports.rentVehicle = async (req, res) => {

    console.log("rentVehicle");

    const { vehicleId, stationId, userId } = req.body;
    try {
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle || !vehicle.isAvailable) {
            return res.status(400).json({ message: 'Vehicle not available' });
        }

        const rental = new Rental({
            vehicle: vehicleId,
            station: stationId,
            user: userId,
            rentedAt: Date.now(),
        });

        await rental.save();

        vehicle.isAvailable = false;
        await vehicle.save();

        // remove the vehicle from the station

        const station = await Station.findById(stationId);

        // this is a hacky way to remove the vehicle from the station
        station.vehicles = station.vehicles.filter((v) => v.toString() !== vehicleId);

        await station.save();


        return res.status(200).json({ success: true, rental, message: 'Vehicle rented successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Return a vehicle
exports.returnVehicle = async (req, res) => {

    console.log("returnVehicle");

    const { vehicleId, stationId } = req.body; // Use vehicleId from the request body
    try {
        const rental = await Rental.findOneAndDelete({ vehicle: vehicleId, returnedAt: null }); // Find active rental
        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }

        const vehicle = await Vehicle.findById(vehicleId);
        vehicle.isAvailable = true;
        await vehicle.save();

        const station = await Station.findById(stationId);
        station.vehicles.push(vehicleId); // Update station vehicle count
        await station.save();

        return res.status(200).json({ success: true, rental });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



// Get user's rental history
exports.getUserRentals = async (req, res) => {

    console.log("getUserRentals");

    const userId = req.params.userId;
    try {
        const rentals = await Rental.find({ user: userId });

        console.log(userId);
        return res.status(200).json(rentals);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

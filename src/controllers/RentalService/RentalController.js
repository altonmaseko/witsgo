const Rental = require('../../models/Rental/rental');
const Vehicle = require('../../models/Rental/vehicle');
const Station = require('../../models/Rental/station');

// Rent a vehicle
exports.rentVehicle = async (req, res) => {
    const { vehicleId, stationId, userId } = req.body;
    try {
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle || !vehicle.isAvailable) {
            return res.status(400).json({ message: 'Vehicle not available' });
        }
        const station = await Station.findById(stationId);
        const rental = new Rental({
            vehicle: vehicleId,
            station: stationId,
            user: userId,
            rentedAt: Date.now(),
        });
        await rental.save();

        vehicle.isAvailable = false;
        await vehicle.save();

        return res.status(200).json(rental);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Return a vehicle
exports.returnVehicle = async (req, res) => {
    const { rentalId, stationId } = req.body;
    try {
        const rental = await Rental.findById(rentalId);
        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }
        rental.returnedAt = Date.now();
        await rental.save();

        const vehicle = await Vehicle.findById(rental.vehicle);
        vehicle.isAvailable = true;
        await vehicle.save();

        const station = await Station.findById(stationId);
        station.vehicles.push(vehicle._id);
        await station.save();

        return res.status(200).json(rental);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Get user's rental history
exports.getUserRentals = async (req, res) => {
    const userId = req.params.userId;
    try {
        const rentals = await Rental.find({ user: userId }).populate('vehicle station');
        return res.status(200).json(rentals);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

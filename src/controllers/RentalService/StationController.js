const Station = require('../../models/Rental/station');

// Get all stations
exports.getStations = async (req, res) => {

    console.log("getStations");

    try {
        const stations = await Station.find({});
        return res.status(200).json(stations);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Get station by ID
exports.getStationById = async (req, res) => {

    console.log("getStationById");

    const { id } = req.params; // Directly destructuring `id` from `req.params`
    try {
        // Using findById for a more appropriate query (returns a single document)
        const station = await Station.findById(id);
        if (!station) {
            return res.status(404).json({ message: 'Station not found' });
        }
        return res.status(200).json(station); // Respond with the station document
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


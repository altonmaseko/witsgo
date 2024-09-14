const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI)
    } catch (error) {
        console.log(error);
    }
}


const accessibilityConnection = mongoose.createConnection('mongodb://localhost:27017/Accessibility', {});

const mapConnection = mongoose.createConnection('mongodb://localhost:27017/Map ', {});

const userRoutesConnection = mongoose.createConnection('mongodb://localhost:27017/UserRoutes', {});

const rentalConnection = mongoose.createConnection('mongodb://localhost:27017/RentalService', {});

const transporationConnection = mongoose.createConnection('mongodb://localhost:27017/Transportation', {});


module.exports = {
    connectDB,
    accessibilityConnection,
    mapConnection,
    userRoutesConnection,
    rentalConnection,
    transporationConnection
}
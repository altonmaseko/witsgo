const mongoose = require("mongoose");

require("dotenv").config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI)
    } catch (error) {
        console.log(error);
    }
}

const accessibilityConnectionURI = process.env.CONNECTION_URI+"Accessibility"
const accessibilityConnection = mongoose.createConnection(accessibilityConnectionURI, {});

const mapConnectionURI = process.env.CONNECTION_URI+"Map"
const mapConnection = mongoose.createConnection(mapConnectionURI, {});

const userRoutesConnectionURI = process.env.CONNECTION_URI+"UserRoutes"
const userRoutesConnection = mongoose.createConnection(userRoutesConnectionURI, {});

const rentalConnectionURI = process.env.CONNECTION_URI+"RentalService"
const rentalConnection = mongoose.createConnection(rentalConnectionURI, {});

const transporationConnectionURI = process.env.CONNECTION_URI+"Transportation"
const transporationConnection = mongoose.createConnection(transporationConnectionURI, {});


module.exports = {
    connectDB,
    accessibilityConnection,
    mapConnection,
    userRoutesConnection,
    rentalConnection,
    transporationConnection
}